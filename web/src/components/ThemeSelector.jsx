import React, { useState, useEffect } from 'react';
import { setTheme, getCurrentTheme } from '../utils/themeManager';

const themes = [
  {
    id: 'default',
    name: 'Default',
    description: 'Classic blue theme',
    primary: '#1a2a3a',
    accent: '#3498db'
  },
  {
    id: 'light',
    name: 'Light Mode',
    description: 'Clean light theme',
    primary: '#e8f4f8',
    accent: '#3498db'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Deep dark theme',
    primary: '#0d0d0d',
    accent: '#2980b9'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Green gaming theme',
    primary: '#0f2818',
    accent: '#27ae60'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange theme',
    primary: '#2d1810',
    accent: '#e67e22'
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    description: 'Elegant purple theme',
    primary: '#1a1a2e',
    accent: '#8e44ad'
  }
];

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = getCurrentTheme();
    setSelectedTheme(savedTheme);
  }, []);

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
    setTheme(themeId);
  };

  return (
    <div style={{ 
      display: 'block',
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
      paddingBottom: '8px'
    }}>
      {themes.map(theme => (
        <div 
          key={theme.id}
          onClick={() => handleThemeSelect(theme.id)}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '130px',
            height: '50px',
            padding: '8px',
            margin: '0 8px 0 0',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'center',
            backgroundColor: selectedTheme === theme.id ? 'var(--btn-tertiary-shadow)' : 'rgba(255, 255, 255, 0.08)',
            border: selectedTheme === theme.id ? '2px solid var(--btn-tertiary-start)' : '2px solid rgba(255, 255, 255, 0.15)',
            verticalAlign: 'top',
            whiteSpace: 'normal',
            position: 'relative'
          }}
        >
          {/* Color preview dots */}
          <div style={{ 
            position: 'absolute', 
            top: '6px', 
            right: '6px',
            display: 'flex',
            gap: '3px'
          }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: theme.primary,
              border: '1px solid rgba(255,255,255,0.3)'
            }} />
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: theme.accent,
              border: '1px solid rgba(255,255,255,0.3)'
            }} />
          </div>
          
          <div style={{ fontWeight: 'bold', color: '#bcdcff', fontSize: '13px' }}>
            {theme.name}
          </div>
          <div style={{ color: '#a0b9d6', fontSize: '10px', marginTop: '2px' }}>
            {theme.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeSelector;