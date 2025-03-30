import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, FlatList, ScrollView } from 'react-native';
import { Card } from './Card';
import { useGame } from '../hooks/useGame';

export function GameScreen() {
  const { 
    gameState, 
    gameList, 
    gameId,
    error, 
    view,
    setError,
    createGame, 
    joinGame, 
    placeBet, 
    nextRound,
    returnToLobby,
    leaveGame,
    refreshGameList
  } = useGame();

  const [playerName, setPlayerName] = useState('');
  const [customBet, setCustomBet] = useState('');

  // Render the lobby view with game list
  const renderLobby = () => (
    <View style={styles.lobbyContainer}>
      <Text style={styles.title}>In Between</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.nameInputContainer}>
        <TextInput
          placeholder="Enter your name"
          value={playerName}
          onChangeText={setPlayerName}
          style={styles.nameInput}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.createGameContainer}>
        <Pressable 
          style={styles.createButton}
          onPress={() => createGame(playerName)}
          disabled={!playerName.trim()}
        >
          <Text style={styles.createButtonText}>Create New Game</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitle}>Available Games</Text>
      
      {gameList.length === 0 ? (
        <Text style={styles.noGames}>No games available. Create one!</Text>
      ) : (
        <FlatList
          data={gameList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.gameListItem}>
              <View style={styles.gameInfo}>
                <Text style={styles.gameId}>Game ID: {item.id}</Text>
                <Text style={styles.hostName}>Host: {item.hostName}</Text>
                <Text style={styles.playerCount}>
                  Players: {item.playerCount}/{item.maxPlayers}
                </Text>
                <Text style={styles.gamePhase}>
                  {item.phase === 'waiting' ? 'Waiting for players' : `Round ${item.round}`}
                </Text>
              </View>
              <Pressable
                style={styles.joinButton}
                onPress={() => joinGame(item.id, playerName)}
                disabled={!playerName.trim()}
              >
                <Text style={styles.joinButtonText}>Join</Text>
              </Pressable>
            </View>
          )}
          style={styles.gameList}
        />
      )}

      <Pressable 
        style={styles.refreshButton}
        onPress={refreshGameList}
      >
        <Text style={styles.refreshButtonText}>Refresh Games</Text>
      </Pressable>
    </View>
  );

  // Render the game view
  const renderGame = () => (
    <ScrollView style={styles.gameContainer}>
      <View style={styles.gameHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.gameTitle}>In Between</Text>
          <Text style={styles.gameIdText}>Game ID: {gameId}</Text>
        </View>
        <Pressable 
          style={styles.leaveButton}
          onPress={() => leaveGame()}
        >
          <Text style={styles.leaveButtonText}>Leave Game</Text>
        </Pressable>
      </View>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {gameState ? (
        <View style={styles.gameArea}>
          <View style={styles.gameInfo}>
            <Text style={styles.potText}>Pot: {gameState.pot || 0}</Text>
          </View>
          
          <View style={styles.cardsContainer}>
            {/* First card (left) */}
            <View style={[styles.card, styles.sideCard]}>
              {gameState.currentCards?.[0] && (
                <Text style={[
                  styles.cardText,
                  { color: gameState.currentCards[0].suit === '♥' || gameState.currentCards[0].suit === '♦' ? '#ff0000' : '#000000' }
                ]}>
                  {gameState.currentCards[0].value}{gameState.currentCards[0].suit}
                </Text>
              )}
            </View>
            
            {/* Third card (middle) */}
            <View style={[
              styles.card,
              styles.middleCard,
              gameState.currentCards?.[2] && !gameState.currentCards[2].revealed ? styles.hiddenCard : null
            ]}>
              {gameState.currentCards?.[2] && !gameState.currentCards[2].revealed ? (
                <Text style={styles.cardBack}>?</Text>
              ) : gameState.currentCards?.[2] && (
                <Text style={[
                  styles.cardText,
                  styles.middleCardText,
                  { color: gameState.currentCards[2].suit === '♥' || gameState.currentCards[2].suit === '♦' ? '#ff0000' : '#000000' }
                ]}>
                  {gameState.currentCards[2].value}{gameState.currentCards[2].suit}
                </Text>
              )}
            </View>
            
            {/* Second card (right) */}
            <View style={[styles.card, styles.sideCard]}>
              {gameState.currentCards?.[1] && (
                <Text style={[
                  styles.cardText,
                  { color: gameState.currentCards[1].suit === '♥' || gameState.currentCards[1].suit === '♦' ? '#ff0000' : '#000000' }
                ]}>
                  {gameState.currentCards[1].value}{gameState.currentCards[1].suit}
                </Text>
              )}
            </View>
          </View>

          {gameState.phase === 'betting' && (
            <View style={styles.betContainer}>
              {gameState.currentPlayerId === useGame().socket?.id ? (
                <>
                  <Text style={styles.betText}>Place your bet</Text>
                  
                  {/* Extreme options row */}
                  <View style={styles.extremeOptionsRow}>
                    <Pressable
                      style={[styles.betButton, styles.extremeButton, styles.passButton]}
                      onPress={() => placeBet(0)}
                    >
                      <Text style={styles.extremeButtonText}>PASS</Text>
                    </Pressable>
                    
                    <Pressable
                      style={[styles.betButton, styles.extremeButton, styles.potButton]}
                      onPress={() => placeBet(-1)}
                    >
                      <Text style={styles.extremeButtonText}>POT (${gameState.pot})</Text>
                    </Pressable>
                  </View>
                  
                  {/* Standard bet options */}
                  <View style={styles.betButtons}>
                    {[1, 2, 5].map(amount => (
                      <Pressable
                        key={amount}
                        style={styles.betButton}
                        onPress={() => placeBet(amount)}
                      >
                        <Text style={styles.betButtonText}>${amount}</Text>
                      </Pressable>
                    ))}
                    
                    {/* Custom bet input */}
                    <View style={styles.customBetContainer}>
                      <TextInput
                        style={styles.customBetInput}
                        placeholder="Custom"
                        placeholderTextColor="#999"
                        keyboardType="number-pad"
                        maxLength={5}
                        onChangeText={(text) => setCustomBet(text.replace(/[^0-9]/g, ''))}
                        value={customBet}
                      />
                      <Pressable
                        style={[styles.betButton, styles.customBetButton]}
                        onPress={() => {
                          const amount = parseInt(customBet, 10);
                          if (!isNaN(amount) && amount > 0) {
                            placeBet(amount);
                            setCustomBet('');
                          }
                        }}
                        disabled={!customBet || isNaN(parseInt(customBet, 10)) || parseInt(customBet, 10) <= 0}
                      >
                        <Text style={styles.betButtonText}>Bet</Text>
                      </Pressable>
                    </View>
                  </View>
                </>
              ) : (
                <View style={styles.waitingContainer}>
                  <Text style={styles.waitingText}>
                    {gameState.players[gameState.currentPlayerId]?.name || 'Another player'} is currently betting...
                  </Text>
                </View>
              )}
            </View>
          )}

          {gameState.result && (
            <View style={[
              styles.resultsContainer,
              gameState.result.outcome === 'win' ? styles.winResultContainer : null
            ]}>
              <Text style={styles.resultText}>
                {gameState.result.outcome === 'win' ? (
                  <Text style={styles.winText}>You won ${gameState.result.winnings}!</Text>
                ) : gameState.result.outcome === 'push' ? (
                  <Text style={styles.pushText}>Push! Your bet of ${gameState.result.bet} is returned.</Text>
                ) : (
                  <Text style={styles.lossText}>You lost ${gameState.result.bet}.</Text>
                )}
              </Text>
              {/* No next round button - automatically transitions */}
              {gameState.result.outcome === 'win' && (
                <Text style={styles.winSubtext}>Next round starting soon...</Text>
              )}
            </View>
          )}

          {gameState.phase === 'gameOver' && (
            <View style={styles.gameOverContainer}>
              <Text style={styles.gameOverText}>Game Over!</Text>
              <Pressable
                style={styles.returnToLobbyButton}
                onPress={returnToLobby}
              >
                <Text style={styles.returnToLobbyButtonText}>Return to Lobby</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.playersContainer}>
            <Text style={styles.playersTitle}>Players</Text>
            <FlatList
              data={Object.values(gameState.players)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.playerItem}>
                  <Text style={styles.playerName}>{item.name}</Text>
                  <Text style={styles.playerScore}>${item.score}</Text>
                </View>
              )}
              style={styles.playersList}
            />
          </View>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading game...</Text>
        </View>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {view === 'lobby' ? renderLobby() : renderGame()}
    </View>
  );
}

const styles = StyleSheet.create({
  // Common styles
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 30,
    marginBottom: 15,
  },
  error: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 10,
  },
  
  // Lobby styles
  lobbyContainer: {
    flex: 1,
    padding: 20,
  },
  nameInputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  nameInput: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 4,
    width: '80%',
    fontSize: 18,
  },
  createGameContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gameList: {
    maxHeight: 300,
  },
  gameListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 10,
  },
  gameInfo: {
    flex: 1,
  },
  gameId: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hostName: {
    color: '#cccccc',
    fontSize: 14,
  },
  playerCount: {
    color: '#cccccc',
    fontSize: 14,
  },
  gamePhase: {
    color: '#cccccc',
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  noGames: {
    textAlign: 'center',
    color: '#cccccc',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  refreshButton: {
    backgroundColor: '#7f8c8d',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  
  // Game styles
  gameContainer: {
    flex: 1,
    padding: 20,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gameIdText: {
    fontSize: 16,
    color: '#cccccc',
  },
  leaveButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 4,
    minWidth: 100,
    alignItems: 'center',
  },
  leaveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gameArea: {
    alignItems: 'center',
  },
  gameInfo: {
    width: '100%',
    marginBottom: 20,
  },
  roundText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
  potText: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  card: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideCard: {
    width: 80,
    height: 120,
    marginHorizontal: 5,
    zIndex: 1,
  },
  middleCard: {
    width: 100,
    height: 150,
    marginHorizontal: -10, // Overlap with side cards
    zIndex: 2, // Ensure middle card appears on top
    elevation: 5, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  hiddenCard: {
    backgroundColor: '#3498db',
  },
  cardBack: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  middleCardText: {
    fontSize: 30, // Larger text for middle card
  },
  betContainer: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  betText: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  extremeOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  extremeButton: {
    flex: 1,
    marginHorizontal: 10,
    padding: 15,
    minWidth: 120,
  },
  passButton: {
    backgroundColor: '#7f8c8d',
  },
  potButton: {
    backgroundColor: '#e74c3c',
  },
  extremeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  betButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  betButton: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 4,
    minWidth: 70,
    alignItems: 'center',
    margin: 5,
  },
  betButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  customBetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  customBetInput: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 4,
    width: 100,
    marginRight: 5,
    color: '#000000',
  },
  customBetButton: {
    backgroundColor: '#3498db',
  },
  waitingContainer: {
    padding: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  waitingText: {
    color: '#ffffff',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  resultsContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 15,
    borderRadius: 8,
  },
  winResultContainer: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    borderWidth: 1,
    borderColor: '#2ecc71',
    // Add animation for win container
    transform: [{ scale: 1 }], // This will be animated
  },
  resultText: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  winText: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 28,
  },
  pushText: {
    color: '#f39c12',
    fontWeight: 'bold',
  },
  lossText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  winSubtext: {
    color: '#2ecc71',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
  },
  gameOverContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 15,
  },
  returnToLobbyButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 4,
    minWidth: 180,
    alignItems: 'center',
  },
  returnToLobbyButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  playersContainer: {
    width: '100%',
    marginTop: 30,
  },
  playersTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  playersList: {
    maxHeight: 200,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    marginBottom: 5,
  },
  playerName: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  playerScore: {
    color: '#2ecc71',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  loadingText: {
    fontSize: 20,
    color: '#cccccc',
  },
});
