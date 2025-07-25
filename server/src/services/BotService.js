/**
 * BotService - Manages AI bots for single player experience
 */

const BaseService = require('./BaseService');
const VirtualSocket = require('../utils/VirtualSocket');
const { botNames } = require('../utils/botNames');
const { GamePhases } = require('../../../shared/constants/GamePhases');
const socketIOInterceptor = require('../utils/SocketIOInterceptor');

class BotService extends BaseService {
  constructor() {
    super();
    this.activeBots = new Map();
    this.botsByGame = new Map();
    this.usedBotNames = new Set();
    this.readyBots = [];
    this.targetReadyBots = 10;
    this.deploymentLocks = new Map(); // Track ongoing deployments per game
  }

  async init() {
    await this.maintainReadyBotPool();
    this.setupGameListListener();
    this.setupSocketIOInterception();
  }

  async maintainReadyBotPool() {
    const needed = this.targetReadyBots - this.readyBots.length;
    if (needed <= 0) return;
    
    for (let i = 0; i < needed; i++) {
      try {
        const readyBot = await this.createReadyBot();
        this.readyBots.push(readyBot);
      } catch (error) {
        // Skip failed bot creation
      }
    }
  }

  async createReadyBot() {
    const username = this.getRandomBotName();
    const userId = `user_${username}`;
    
    const databaseService = this.getService('database');
    const existingUser = await databaseService.getUserByUsername(username);
    if (existingUser) {
      throw new Error(`Bot user ${username} already exists`);
    }
    
    await databaseService.createUser({ 
      username: username, 
      hashedPassword: 'bot_placeholder_password' 
    });

    const authService = this.getService('auth');
    const token = authService.generateToken(userId, username);

    return {
      id: userId,
      username: username,
      token: token,
      balance: 2000,
      decisionEngine: new BotDecisionEngine(),
      createdAt: Date.now()
    };
  }

  setupGameListListener() {
    const broadcastService = this.getService('broadcast');
    const originalBroadcastGameList = broadcastService.broadcastGameList.bind(broadcastService);
    
    broadcastService.broadcastGameList = () => {
      originalBroadcastGameList();
      setTimeout(() => this.checkForGamesNeedingBots(), 500);
    };
  }

  async checkForGamesNeedingBots() {
    const gameList = this.getService('game').getGameList();
    
    for (const gameInfo of gameList) {
      if (gameInfo.phase !== 'waiting' || this.readyBots.length === 0 || this.deploymentLocks.has(gameInfo.id)) continue;
      
      const requestedBots = gameInfo.settings?.numberOfBots || 0;
      if (requestedBots === 0) continue;
      
      const humanPlayers = gameInfo.allPlayers.filter(player => !botNames.includes(player.name)).length;
      if (humanPlayers === 0) continue;
      
      const currentBots = gameInfo.allPlayers.filter(player => botNames.includes(player.name)).length;
      const { MAX_SEATS } = require('../../../shared/constants/GameConstants');
      const botsNeeded = Math.min(requestedBots - currentBots, MAX_SEATS - gameInfo.playerCount);
      
      if (botsNeeded > 0) {
        await this.deployBotsToGame(gameInfo.id, botsNeeded);
      }
    }
    
    await this.maintainReadyBotPool();
  }

  async deployBotsToGame(gameId, botsNeeded) {
    // Set deployment lock to prevent concurrent deployments
    this.deploymentLocks.set(gameId, true);
    
    try {
      // Deploy the exact number of bots needed
      for (let i = 0; i < botsNeeded && this.readyBots.length > 0; i++) {
        await this.deployReadyBot(gameId);
      }
    } finally {
      // Always clear the lock when done
      this.deploymentLocks.delete(gameId);
    }
  }

  async deployReadyBot(gameId) {
    if (this.readyBots.length === 0) return null;
    
    const readyBot = this.readyBots.shift();
    
    try {
      const socket = new VirtualSocket(readyBot.id, readyBot.username);
      socket.authenticate({ 
        userId: readyBot.id, 
        username: readyBot.username, 
        token: readyBot.token 
      });
      
      const bot = {
        ...readyBot,
        socket: socket,
        gameId: gameId,
        isReady: false,
        lastAction: Date.now(),
        pendingTimeouts: new Set()
      };
      
      this.activeBots.set(readyBot.id, bot);
      if (!this.botsByGame.has(gameId)) {
        this.botsByGame.set(gameId, new Set());
      }
      this.botsByGame.get(gameId).add(readyBot.id);
      
      this.setupBotBehavior(bot);
      await this.joinBotToGame(bot, gameId);
      
      return bot;
    } catch (error) {
      this.readyBots.unshift(readyBot);
      throw error;
    }
  }

  async joinBotToGame(bot, gameId) {
    const gameService = this.getService('game');
    const connectionService = this.getService('connection');
    
    // Register virtual socket with interceptor for broadcasts
    socketIOInterceptor.joinRoom(bot.socket, gameId);
    
    // Set up the socket as if it was authenticated
    bot.socket.user = {
      userId: bot.id,
      username: bot.username
    };
    bot.socket.authenticated = true;
    
    // Register service event handlers on the virtual socket
    // This ensures the virtual socket can respond to game events
    connectionService.registerServiceEventHandlers(bot.socket);
    
    await gameService.handleJoinGame(bot.socket, { gameId });
  }

  setupBotBehavior(bot) {
    bot.socket.on('gameState', (gameState) => {
      this.handleGameStateUpdate(bot, gameState);
    });

    bot.socket.on('disconnect', () => {
      this.removeBot(bot.id);
    });
  }

  async handleGameStateUpdate(bot, gameState) {
    if (!gameState?.players) return;

    const botPlayer = gameState.players[bot.id];
    if (!botPlayer) return;
    
    const playerCount = Object.keys(gameState.players).length;
    const stateKey = `${gameState.phase}_${botPlayer.isReady}_${gameState.currentPlayerId}_${gameState.waitingForAceDecision}_${gameState.waitingForSecondChance}_${playerCount}`;
    if (bot.lastProcessedState === stateKey) return;
    bot.lastProcessedState = stateKey;

    if (gameState.phase === GamePhases.WAITING) {
      const playerIds = Object.keys(gameState.players);
      const humanPlayers = playerIds.filter(playerId => {
        const player = gameState.players[playerId];
        return player && !botNames.includes(player.name);
      });
      
      if (humanPlayers.length === 0 && playerIds.length > 1 && !bot.isLeavingGame) {
        bot.isLeavingGame = true;
        const delay = Math.random() * 1500 + 500;
        const timeoutId = setTimeout(() => {
          bot.pendingTimeouts.delete(timeoutId);
          if (this.activeBots.has(bot.id)) {
            bot.socket.emit('leaveGame');
          }
        }, delay);
        bot.pendingTimeouts.add(timeoutId);
        return;
      }
      
      if (playerIds.length === 1 && !bot.isLeavingGame) {
        bot.isLeavingGame = true;
        const timeoutId = setTimeout(() => {
          bot.pendingTimeouts.delete(timeoutId);
          if (this.activeBots.has(bot.id)) {
            bot.socket.emit('leaveGame');
          }
        }, 1000);
        bot.pendingTimeouts.add(timeoutId);
        return;
      }
      
      if (!botPlayer.isReady && !bot.isProcessingReady) {
        this.scheduleAction(bot, 'isProcessingReady', 'ready', Math.random() * 1000 + 500);
        return;
      }
    }

    if (gameState.phase === GamePhases.BETTING && gameState.currentPlayerId === bot.id) {
      await this.handleBettingPhase(bot, gameState, botPlayer);
    } else if (gameState.waitingForAceDecision && gameState.currentPlayerId === bot.id) {
      await this.handleAceDecision(bot, gameState, botPlayer);
    } else if (gameState.waitingForSecondChance && gameState.currentPlayerId === bot.id) {
      await this.handleSecondChance(bot, gameState, botPlayer);
    }
  }

  async handleBettingPhase(bot, gameState, botPlayer) {
    if (gameState.currentPlayerId !== bot.id) return;
    if (botPlayer.hasBet || botPlayer.hasPassed) return;

    if (bot.isProcessingBet) return; // Prevent duplicate betting actions
    bot.isProcessingBet = true;
    
    const delay = Math.random() * 2000 + 1000;
    const timeoutId = setTimeout(() => {
      bot.pendingTimeouts.delete(timeoutId);
      bot.isProcessingBet = false;
      if (!this.activeBots.has(bot.id)) return;
      if (gameState.phase !== GamePhases.BETTING || gameState.currentPlayerId !== bot.id) return;
      if (botPlayer.hasBet || botPlayer.hasPassed) return;

      const decision = bot.decisionEngine.makeBettingDecision(gameState, botPlayer);
      
      if (decision.action === 'bet') {
        bot.socket.emit('placeBet', { bet: decision.amount });
      } else {
        bot.socket.emit('placeBet', { bet: 0 });
      }
    }, delay);
    bot.pendingTimeouts.add(timeoutId);
  }

  async handleAceDecision(bot, gameState, botPlayer) {
    if (gameState.currentPlayerId !== bot.id || bot.isProcessingAce) return;
    
    bot.isProcessingAce = true;
    const timeoutId = setTimeout(() => {
      bot.pendingTimeouts.delete(timeoutId);
      bot.isProcessingAce = false;
      if (!this.activeBots.has(bot.id)) return;
      
      const aceChoice = bot.decisionEngine.makeAceDecision(gameState);
      const decision = { isAceLow: aceChoice === 'low' };
      bot.socket.emit('chooseAceValue', decision);
    }, Math.random() * 1000 + 500);
    bot.pendingTimeouts.add(timeoutId);
  }

  async handleSecondChance(bot, gameState, botPlayer) {
    if (gameState.currentPlayerId !== bot.id || bot.isProcessingSecondChance) return;
    
    bot.isProcessingSecondChance = true;
    const timeoutId = setTimeout(() => {
      bot.pendingTimeouts.delete(timeoutId);
      bot.isProcessingSecondChance = false;
      if (!this.activeBots.has(bot.id)) return;
      
      const decision = bot.decisionEngine.makeSecondChanceDecision(gameState, botPlayer);
      bot.socket.emit('secondChance', { anteAgain: decision.accepted });
    }, Math.random() * 800 + 300);
    bot.pendingTimeouts.add(timeoutId);
  }

  scheduleAction(bot, flag, event, delay) {
    if (bot[flag]) return;
    bot[flag] = true;
    const timeoutId = setTimeout(() => {
      bot.pendingTimeouts.delete(timeoutId);
      bot[flag] = false;
      if (this.activeBots.has(bot.id)) bot.socket.emit(event);
    }, delay);
    bot.pendingTimeouts.add(timeoutId);
  }


  getRandomBotName() {
    const availableNames = botNames.filter(name => !this.usedBotNames.has(name));
    const selectedName = availableNames.length > 0 
      ? availableNames[Math.floor(Math.random() * availableNames.length)]
      : `EpicGamer${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    this.usedBotNames.add(selectedName);
    return selectedName;
  }

  removeBot(botId) {
    const bot = this.activeBots.get(botId);
    if (!bot) return;

    bot.pendingTimeouts?.forEach(clearTimeout);
    bot.pendingTimeouts?.clear();
    
    Object.assign(bot, { isProcessingReady: false, isProcessingBet: false, isProcessingAce: false, isProcessingSecondChance: false, isLeavingGame: false, lastProcessedState: null });

    if (this.botsByGame.has(bot.gameId)) {
      this.botsByGame.get(bot.gameId).delete(botId);
      if (this.botsByGame.get(bot.gameId).size === 0) {
        this.botsByGame.delete(bot.gameId);
      }
    }

    socketIOInterceptor.removeSocket(bot.socket);
    bot.socket.disconnect('bot removed');
    this.usedBotNames.delete(bot.username);
    this.activeBots.delete(botId);
    
    setTimeout(() => this.maintainReadyBotPool(), 1000);
  }

  removeBotsFromGame(gameId) {
    const botIds = this.botsByGame.get(gameId);
    if (botIds) {
      Array.from(botIds).forEach(botId => this.removeBot(botId));
      this.deploymentLocks.delete(gameId);
    }
  }

  setupSocketIOInterception() {
    const connectionService = this.getService('connection');
    connectionService?.io 
      ? socketIOInterceptor.interceptSocketIO(connectionService.io)
      : setTimeout(() => this.setupSocketIOInterception(), 1000);
  }

  getStats() {
    return {
      activeBots: this.activeBots.size,
      readyBots: this.readyBots.length,
      gamesWithBots: this.botsByGame.size,
      usedNames: this.usedBotNames.size,
      availableNames: botNames.length - this.usedBotNames.size
    };
  }
}

/**
 * BotDecisionEngine - AI logic for making game decisions
 */
class BotDecisionEngine {
  constructor() {
    const personality = Math.random();
    if (personality < 0.4) {
      // Aggressive bots (40%) - bet on anything decent
      this.bettingThreshold = 0.10; // 10% chance
      this.maxBetRatio = 0.8;
      this.secondChanceThreshold = 0.25;
    } else if (personality < 0.8) {
      // Moderate bots (40%) - bet on good hands
      this.bettingThreshold = 0.20; // 20% chance
      this.maxBetRatio = 0.5;
      this.secondChanceThreshold = 0.35;
    } else {
      // Conservative bots (20%) - only bet on great hands
      this.bettingThreshold = 0.30; // 30% chance
      this.maxBetRatio = 0.3;
      this.secondChanceThreshold = 0.45;
    }
  }

  makeBettingDecision(gameState, botPlayer) {
    if (!gameState.firstCard || !gameState.secondCard) {
      return { action: 'pass' };
    }

    const card1 = gameState.firstCard;
    const card2 = gameState.secondCard;
    const winProbability = this.calculateWinProbability(card1, card2);
    
    if (winProbability < this.bettingThreshold) {
      return { action: 'pass' };
    }

    const potAmount = gameState.pot || 0;
    const maxBetAmount = Math.min(potAmount, botPlayer.balance);
    
    // Realistic betting behavior: prefer pot bets or pass
    // Only bet specific amounts when odds are marginal
    const potBetThreshold = this.bettingThreshold + 0.15; // 15% above base threshold
    
    if (winProbability >= potBetThreshold) {
      // High confidence - bet the pot
      return { action: 'bet', amount: maxBetAmount };
    } else {
      // Marginal odds - either pass or bet small amount
      const shouldBetSmall = Math.random() < 0.3; // 30% chance to bet small
      
      if (shouldBetSmall) {
        const smallBetAmount = Math.min(Math.floor(maxBetAmount * 0.2), 5);
        return smallBetAmount >= 1 ? { action: 'bet', amount: smallBetAmount } : { action: 'pass' };
      } else {
        return { action: 'pass' };
      }
    }
  }

  calculateWinProbability(card1, card2) {
    const getValue = (card) => {
      const rank = card.rank || card.value; // Handle both formats
      if (rank === 'A') return 1;
      if (rank === 'J') return 11;
      if (rank === 'Q') return 12;
      if (rank === 'K') return 13;
      return parseInt(rank);
    };

    const val1 = getValue(card1);
    const val2 = getValue(card2);
    
    const low = Math.min(val1, val2);
    const high = Math.max(val1, val2);
    
    if (low === high) return 0;
    
    const gap = high - low - 1;
    const winningCards = gap * 4;
    const remainingCards = 50;
    
    const probability = winningCards / remainingCards;
    return Math.min(probability * 1.1, 0.9);
  }

  makeAceDecision(gameState) {
    return Math.random() < 0.75 ? 'low' : 'high';
  }

  getCardValue(card) {
    const rank = card.rank || card.value; // Handle both formats
    if (rank === 'J') return 11;
    if (rank === 'Q') return 12;
    if (rank === 'K') return 13;
    return parseInt(rank);
  }

  makeSecondChanceDecision(gameState, botPlayer) {
    const potAmount = gameState.pot || 0;
    
    // Calculate probability based on pot amount
    // 0% at pot = 0, increasing to 100% at pot = 80+
    const baseProbability = Math.min(potAmount / 80, 1.0);
    
    // Add some personality variation
    const personalityModifier = (this.secondChanceThreshold - 0.35) * 0.5; // -0.1 to +0.1
    const finalProbability = Math.max(0, Math.min(1, baseProbability + personalityModifier));
    
    return { accepted: Math.random() < finalProbability };
  }
}

module.exports = new BotService();