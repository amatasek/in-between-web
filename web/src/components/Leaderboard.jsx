import React, { useState, useEffect } from 'react';
import CurrencyAmount from './common/CurrencyAmount';
import UserAvatar from './UserAvatar';
import styles from './styles/Leaderboard.module.css';
import { API_URL } from '../config';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [duration, setDuration] = useState('all');

  useEffect(() => {
    fetchLeaderboard();
  }, [duration]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/leaderboard?duration=${duration}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRankDisplay = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className={styles.leaderboardContainer}>
      <div className={styles.leaderboardHeader}>
        <div className={styles.durationSelector}>
          <button 
            className={`${styles.durationButton} ${duration === 'all' ? styles.active : ''}`}
            onClick={() => setDuration('all')}
            data-gamepad-focusable="true"
          >
            All Time
          </button>
          <button 
            className={`${styles.durationButton} ${duration === '30days' ? styles.active : ''}`}
            onClick={() => setDuration('30days')}
            data-gamepad-focusable="true"
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingMessage}>
          <div className={styles.loadingSpinner}></div>
          Loading leaderboard...
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>Error: {error}</div>
      ) : leaderboard.length === 0 ? (
        <div className={styles.emptyMessage}>
          No players found for this time period.
        </div>
      ) : (
        <div 
          className={styles.leaderboardList}
          data-gamepad-scrollable="true"
          tabIndex="0"
        >
          {leaderboard.map((player) => (
            <div key={player.userId} className={styles.leaderboardRow}>
              <div className={styles.rankCell}>
                <span className={styles.rank}>{getRankDisplay(player.rank)}</span>
              </div>
              
              <div className={styles.playerCell}>
                <UserAvatar 
                  user={{
                    username: player.username,
                    profileImg: player.profileImg,
                    title: player.title
                  }}
                  size="small"
                  showName={true}
                  showTitle={true}
                  namePosition="right"
                />
              </div>
              
              <div className={styles.statsCell}>
                <CurrencyAmount amount={player.totalProfit} size="small" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;