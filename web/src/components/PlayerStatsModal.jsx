import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import baseModalStyles from './common/BaseModal.module.css';
import BaseModal from './common/BaseModal';
import GameSummaryModal from './GameSummaryModal';
import CurrencyAmount from './common/CurrencyAmount';
import styles from './styles/PlayerStatsModal.module.css';

const PlayerStatsModal = ({ onClose }) => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' or 'history'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historyData, setHistoryData] = useState({ games: [], pagination: {} });
  const [currentPage, setCurrentPage] = useState(0);
  const [showGameSummary, setShowGameSummary] = useState(false);
  const [selectedGameData, setSelectedGameData] = useState(null);
  const [lifetimeStats, setLifetimeStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);
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
  
  // Fetch lifetime stats from the dedicated stats endpoint
  useEffect(() => {
    const fetchLifetimeStats = async () => {
      setStatsLoading(true);
      setStatsError(null);
      
      try {
        const response = await fetch('/api/stats/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch lifetime stats');
        }
        
        const data = await response.json();
        setLifetimeStats(data.stats);
      } catch (err) {
        console.error('Error fetching lifetime stats:', err);
        setStatsError(err.message);
      } finally {
        setStatsLoading(false);
      }
    };
    
    fetchLifetimeStats();
  }, [token]);

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
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Format stat label from camelCase to Title Case with spaces
  const formatStatLabel = (key) => {
    // Insert space before capital letters and uppercase the first letter
    const formatted = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
    
    return formatted;
  };
  
  // Format stat value based on the explicit type or the value itself
  const formatStatValue = (type, value) => {
    // Handle different types of values appropriately
    if (typeof value === 'number') {
      // Format based on explicit type if provided
      if (type === 'currency') {
        // Return CurrencyAmount component for currency values
        return <CurrencyAmount amount={value.toFixed(2)} size="small" />;
      }
      
      if (type === 'percentage') {
        return `${(value * 100).toFixed(1)}%`;
      }
      
      // Just return the number for counts
      return value.toLocaleString();
    }
    
    // For boolean values
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    // For dates - only format as date if explicitly typed as 'date' or is an actual Date object
    if (type === 'date' || value instanceof Date) {
      return formatDate(value);
    }
    
    // Handle numeric types explicitly
    if (type === 'number') {
      return Number(value).toLocaleString();
    }
    
    // Default toString for anything else
    return String(value);
  };
  
  // Get the round count from the game data
  const getRoundCount = (game) => {
    return game.roundCount || 0;
  };

  const handleGameClick = (gameId) => {
    // Find the selected game in our existing data
    const selectedGame = historyData.games.find(game => game._id === gameId);
    if (selectedGame) {
      // Just pass the gameData object which already has the correct structure
      setSelectedGameData(selectedGame.gameData);
      setShowGameSummary(true);
    }
  };

  return (
    <>
      <BaseModal title="Player Stats" onClose={onClose} style={{ maxWidth: 800, height: '90ßvh' }}>
        <div className={baseModalStyles.settingsContainer}>
          {/* Tab Bar Navigation */}
          <div className={styles.tabsContainer}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'stats' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              Lifetime Stats
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'history' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Game History
            </button>
          </div>

          {/* Lifetime Stats Tab Content */}
          {activeTab === 'stats' && (
            <div className={styles.tabContent}>
              {statsLoading ? (
                <div className={styles.loadingMessage}>
                  <div className={styles.loadingSpinner}></div>
                  Loading your lifetime stats...
                </div>
              ) : statsError ? (
                <div className={styles.errorMessage}>Error: {statsError}</div>
              ) : !lifetimeStats || lifetimeStats.length === 0 ? (
                <div className={styles.statsPlaceholder}>
                  <p>No lifetime statistics available.</p>
                </div>
              ) : (
                <div className={styles.statsGrid}>
                  {lifetimeStats.map((stat) => (
                    <div key={stat.key} className={styles.statItem}>
                      <div className={styles.statLabel}>{stat.label}</div>
                      <div className={styles.statValue}>
                        {formatStatValue(stat.type, stat.value)}
                        {stat.suffix && <span className={styles.statSuffix}>{stat.suffix}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Game History Tab Content */}
          {activeTab === 'history' && (
            <div className={styles.tabContent}>
              {loading ? (
                <div className={styles.loadingMessage}>
                  <div className={styles.loadingSpinner}></div>
                  Loading your game history...
                </div>
              ) : error ? (
                <div className={styles.errorMessage}>Error: {error}</div>
              ) : historyData.games.length === 0 ? (
                <div className={styles.statsPlaceholder}>
                  <p>No games found in your history.</p>
                </div>
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
