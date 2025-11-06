import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { API_URL } from '../config';

const DailyRewardContext = createContext();

export const useDailyReward = () => {
  const context = useContext(DailyRewardContext);
  if (!context) {
    throw new Error('useDailyReward must be used within a DailyRewardProvider');
  }
  return context;
};

export const DailyRewardProvider = ({ children }) => {
  const { token, refreshUserData } = useAuth();
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch daily reward offerings
  const fetchOfferings = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/daily-reward/offerings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch offerings');
      }

      const data = await response.json();
      setOfferings(data.offerings);
    } catch (err) {
      console.error('[DAILY_REWARD] Error fetching offerings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Claim a daily reward
  const claimReward = useCallback(async (day) => {
    if (!token) {
      throw new Error('No authentication token available');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/daily-reward/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ day })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to claim reward');
      }

      // Refresh user data to get updated dailyRewards, XP, and chips
      await refreshUserData();

      return data;
    } catch (err) {
      console.error('[DAILY_REWARD] Error claiming reward:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, refreshUserData]);

  // Fetch offerings when context mounts
  useEffect(() => {
    fetchOfferings();
  }, [fetchOfferings]);

  const value = {
    offerings,
    loading,
    error,
    claimReward,
    fetchOfferings
  };

  return (
    <DailyRewardContext.Provider value={value}>
      {children}
    </DailyRewardContext.Provider>
  );
};
