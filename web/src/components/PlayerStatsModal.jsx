import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import baseModalStyles from './common/BaseModal.module.css';
import BaseModal from './common/BaseModal';
import GameSummaryModal from './GameSummaryModal';
import styles from './styles/PlayerStatsModal.module.css';

const PlayerStatsModal = ({ onClose }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historyData, setHistoryData] = useState({ games: [], pagination: {} });
  const [currentPage, setCurrentPage] = useState(0);
  const [showGameSummary, setShowGameSummary] = useState(false);
  const [selectedGameData, setSelectedGameData] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    const fetchGameHistory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/games/history?pageSize=${pageSize}&pageNumber=${currentPage}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch game history');
        }
        
        const data = await response.json();
        setHistoryData(data);
      } catch (err) {
        console.error('Error fetching game history:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGameHistory();
  }, [token, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (historyData.pagination && 
        historyData.games.length === pageSize) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get the round count from the game data
  const getRoundCount = (game) => {
    return game.roundCount || 0;
  };

  const handleGameClick = (gameId) => {
    // Find the selected game in our existing data
    const selectedGame = historyData.games.find(game => game._id === gameId);
    if (selectedGame) {
      setSelectedGameData(selectedGame);
      setShowGameSummary(true);
    }
  };

  return (
    <>
      <BaseModal title="Player Stats" onClose={onClose} style={{ maxWidth: 800, maxHeight: '80vh' }}>
        <div className={baseModalStyles.settingsContainer}>
          {/* Lifetime Stats Section */}
          <div className={baseModalStyles.sectionHeader}>Lifetime Stats</div>
          <div className={styles.statsPlaceholder}>
            <p>Lifetime statistics coming soon!</p>
          </div>

          {/* Game History Section */}
          <div className={baseModalStyles.sectionHeader}>Game History</div>
          
          {loading ? (
            <div className={styles.loadingMessage}>
              <div className={styles.loadingSpinner}></div>
              Loading your game history...
            </div>
          ) : error ? (
            <div className={styles.errorMessage}>Error: {error}</div>
          ) : historyData.games.length === 0 ? (
            <div className={styles.emptyMessage}>No games found in your history.</div>
          ) : (
            <>
              <div className={styles.historyTable}>
                <div className={styles.tableHeader}>
                  <div className={styles.gameNameHeader}>Game</div>
                  <div className={styles.playerCountHeader}>Players</div>
                  <div className={styles.roundsHeader}>Rounds</div>
                  <div className={styles.endDateHeader}>Ended</div>
                </div>
                
                {historyData.games.map((game) => (
                  <div key={game._id} className={styles.historyRow}>
                    <div className={styles.gameNameCell}>
                      <span 
                        className={styles.gameNameLink} 
                        onClick={() => handleGameClick(game._id)}
                      >
                        #{game._id}
                      </span>
                    </div>
                    <div className={styles.playerCountCell}>{game.totalPlayerCount}</div>
                    <div className={styles.roundsCell}>{getRoundCount(game)}</div>
                    <div className={styles.endDateCell}>{formatDate(game.endedAt)}</div>
                  </div>
                ))}
              </div>
              
              <div className={styles.pageInfo}>
                <button 
                  onClick={handlePreviousPage} 
                  disabled={currentPage === 0}
                  className={styles.pageButton}
                  aria-label="Previous page"
                >
                  &larr;
                </button>
                
                Page {currentPage + 1}
                {historyData.pagination && historyData.pagination.total ? 
                  ` of ${Math.ceil(historyData.pagination.total / pageSize)}` : ''}
                
                <button 
                  onClick={handleNextPage} 
                  disabled={!historyData.pagination || historyData.games.length < pageSize}
                  className={styles.pageButton}
                  aria-label="Next page"
                >
                  &rarr;
                </button>
              </div>
            </>
          )}
        </div>
      </BaseModal>
      
      {showGameSummary && selectedGameData && (
        <GameSummaryModal 
          gameData={selectedGameData}
          onClose={() => {
            setShowGameSummary(false);
            setSelectedGameData(null);
          }} 
        />
      )}
      

    </>
  );
};



export default PlayerStatsModal;
