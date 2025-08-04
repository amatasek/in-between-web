/**
 * Service Integration - Initializes and wires up all services
 * This file serves as the integration point for our service-oriented architecture
 */

const serviceRegistry = require('./services/ServiceRegistry');

const gameService = require('./services/GameService');
const gameStateService = require('./services/GameStateService');
const playerManagementService = require('./services/PlayerManagementService');
const cardService = require('./services/CardService');
const gameTimingService = require('./services/GameTimingService');
const dbService = require('./services/DatabaseService');
const bettingService = require('./services/BettingService');
const connectionService = require('./services/ConnectionService');
const gameEventService = require('./services/GameEventService');
const broadcastService = require('./services/BroadcastService');
const authService = require('./services/AuthService');
const gameTransactionService = require('./services/GameTransactionService');
const gameHistoryService = require('./services/GameHistoryService');
const purchaseService = require('./services/PurchaseService');
const botService = require('./services/BotService');
const notificationService = require('./services/NotificationService');
const achievementService = require('./services/AchievementService');
const xpService = require('./services/XPService');

/**
 * Initialize all services and wire them together
 * @returns {Object} The service registry with all services registered
 */
function initializeServices() {
  serviceRegistry
    .register('connection', connectionService)
    .register('game', gameService)
    .register('gameState', gameStateService)
    .register('playerManagement', playerManagementService)
    .register('gameEvent', gameEventService)
    .register('broadcast', broadcastService)
    .register('database', dbService)
    .register('card', cardService)
    .register('gameTiming', gameTimingService)
    .register('betting', bettingService)
    .register('auth', authService)
    .register('gameTransaction', gameTransactionService)
    .register('gameHistory', gameHistoryService)
    .register('purchase', purchaseService)
    .register('bot', botService)
    .register('notification', notificationService)
    .register('achievement', achievementService)
    .register('xp', xpService);

  // Wire up services (give each service access to others)
  serviceRegistry.wireServices();
  
  console.log('[SERVICE_INTEGRATION] All services bootstrapped');
  
  return serviceRegistry;
}

/**
 * Initialize Socket.IO with the HTTP server
 * @param {Object} server - The HTTP server instance
 * @param {Object} existingSocketIO - Optional existing Socket.IO instance
 * @returns {Object} The Socket.IO instance
 */
function initializeSocketIO(server, existingSocketIO = null) {
  // Always use the ConnectionService to initialize Socket.IO
  // This ensures we're only using the new service architecture
  console.log('[SERVICE_INTEGRATION] Initializing new Socket.IO instance with ConnectionService');
  return connectionService.initialize(server);
}

module.exports = {
  initializeServices,
  initializeSocketIO,
  serviceRegistry
};
