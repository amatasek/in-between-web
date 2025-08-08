import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePreferences } from '../contexts/PreferencesContext';
import baseModalStyles from './common/BaseModal.module.css';
import { API_URL } from '../config';

const TitlesSelector = () => {
  const { token } = useAuth();
  const { preferences, updateSelectedTitle } = usePreferences();
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTitles();
  }, []);

  const loadTitles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/me/titles`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load titles');
      }

      const userTitles = await response.json();
      setTitles(userTitles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleSelect = async (titleString) => {
    try {
      await updateSelectedTitle(titleString);
    } catch (err) {
      setError('Failed to update title');
    }
  };

  if (loading) {
    return <div className={baseModalStyles.loadingMessage}>Loading titles...</div>;
  }

  if (error) {
    return <div className={baseModalStyles.errorMessage}>{error}</div>;
  }

  if (titles.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#a0b9d6' }}>
        No titles unlocked yet. Play games to earn achievements!
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'block',
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
      paddingBottom: '8px'
    }}>
        {/* No Title option */}
        <div
          onClick={() => handleTitleSelect('')}
          style={{
            display: 'inline-block',
            width: '120px',
            height: '36px',
            padding: '8px',
            margin: '0 8px 0 0',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: !preferences.selectedTitle ? 'rgba(100, 169, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)',
            border: !preferences.selectedTitle ? '2px solid #64a9ff' : '2px solid rgba(255, 255, 255, 0.15)',
            verticalAlign: 'top',
            whiteSpace: 'normal',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontWeight: 'bold', color: '#bcdcff', fontSize: '13px' }}>
            No Title
          </div>
          <div style={{ color: '#a0b9d6', fontSize: '10px', marginTop: '2px' }}>
            Display no title
          </div>
        </div>

        {/* Unlocked titles */}
        {titles.map(title => (
          <div 
            key={title.title}
            onClick={() => handleTitleSelect(title.title)}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '130px',
              height: '36px',
              padding: '8px',
              margin: '0 8px 0 0',
              borderRadius: '6px',
              cursor: 'pointer',
              textAlign: 'center',
              backgroundColor: preferences.selectedTitle === title.title ? 'rgba(100, 169, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)',
              border: preferences.selectedTitle === title.title ? '2px solid #64a9ff' : '2px solid rgba(255, 255, 255, 0.15)',
              verticalAlign: 'top',
              whiteSpace: 'normal'
            }}
          >
            <div style={{ fontWeight: 'bold', color: '#bcdcff', fontSize: '13px' }}>
              {title.title}
            </div>
            <div style={{ color: '#a0b9d6', fontSize: '10px', marginTop: '2px' }}>
              {title.description}
            </div>
          </div>
        ))}

      {titles.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '16px', 
          color: '#a0b9d6',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: '8px',
          whiteSpace: 'normal'
        }}>
          No titles unlocked yet. Play games to earn achievements!
        </div>
      )}
    </div>
  );
};

export default TitlesSelector;