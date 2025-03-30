import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AuthForm from './AuthForm';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const { login } = useAuth();

  const [error, setError] = useState(null);

  const handleAuth = async (username, password) => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setError(null);
    const endpoint = `http://localhost:3002/auth/${mode}`;
    
    console.log(`[Auth] ${mode.toUpperCase()} attempt: ${username}`);

    try {
      const requestBody = { username, password };
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('[Client] Error parsing response:', error);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (!data.user?.username || !data.user?.id || !data.token) {
        console.error('[Client] Invalid response format:', {
          hasUser: !!data.user,
          hasUsername: !!data.user?.username,
          hasId: !!data.user?.id,
          hasToken: !!data.token
        });
        throw new Error('Invalid server response format');
      }

      console.log(`[Auth] ${mode.toUpperCase()} successful: ${data.user.username}`);
      try {
        login(data.user, data.token);
      } catch (error) {
        console.error('[Client] Error in login callback:', error);
        throw new Error('Failed to initialize user session');
      }
    } catch (error) {
      console.error('[Client] Auth error:', {
        message: error.message,
        endpoint,
        mode
      });
      setError(error.message || 'Failed to connect to server');
    }


  };

  return (
    <Box className={styles.authPage}>
      <Typography variant="h4" component="h1" className={styles.title}>
        In Between
      </Typography>
      
      <Typography variant="subtitle1" className={styles.subtitle}>
        The classic card game of chance and strategy
      </Typography>
      
      <Box className={styles.formContainer}>
        {error && (
          <Typography className={styles.error}>
            {error}
          </Typography>
        )}
        
        <AuthForm mode={mode} onSubmit={handleAuth} />
        
        <Box textAlign="center" mt={3}>
          <Button
            color="primary"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            sx={{
              color: '#ecf0f1',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {mode === 'login' 
              ? "Don't have an account? Register" 
              : "Already have an account? Login"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
