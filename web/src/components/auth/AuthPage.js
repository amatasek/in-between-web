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
    setError(null);
    const endpoint = `http://localhost:3002${mode === 'login' ? '/auth/login' : '/auth/register'}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Authentication failed');
      }

      const data = await response.json();
      login(data.user, data.token);
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'Failed to connect to server');
      return;
    }


  };

  return (
    <Box className={styles.authPage}>
      <Typography variant="h4" component="h1" className={styles.title}>
        In Between
      </Typography>
      
      {error && (
        <Typography color="error" className={styles.error}>
          {error}
        </Typography>
      )}
      
      <AuthForm mode={mode} onSubmit={handleAuth} />
      
      <Box textAlign="center" mt={2}>
        <Button
          color="primary"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' 
            ? "Don't have an account? Register" 
            : "Already have an account? Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthPage;
