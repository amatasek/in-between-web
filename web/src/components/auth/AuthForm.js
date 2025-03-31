import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  useMediaQuery,
} from '@mui/material';
import styles from './AuthForm.module.css';

const AuthForm = ({ onSubmit, mode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');
  const isSmallMobile = useMediaQuery('(max-width:400px)');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await onSubmit(username, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Paper className={styles.authForm} elevation={0}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'var(--info)', fontWeight: 600 }}>
        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2, backgroundColor: 'rgba(231, 76, 60, 0.2)', color: 'var(--text-primary)' }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          size={isSmallMobile ? "small" : "medium"}
          inputProps={{ minLength: 3 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--info-light)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--info)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--info)',
              },
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--info-light)',
              fontSize: isSmallMobile ? '0.9rem' : '1rem',
            },
            '& .MuiOutlinedInput-input': {
              color: 'var(--text-dark)',
              fontWeight: 500,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              padding: isSmallMobile ? '12px 14px' : '16.5px 14px',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--info)',
            },
            marginBottom: isSmallMobile ? '0.5rem' : '1rem',
          }}
        />
        
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          size={isSmallMobile ? "small" : "medium"}
          inputProps={{ minLength: 6 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--info-light)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--info)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--info)',
              },
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '& .MuiInputLabel-root': {
              color: 'var(--info-light)',
              fontSize: isSmallMobile ? '0.9rem' : '1rem',
            },
            '& .MuiOutlinedInput-input': {
              color: 'var(--text-dark)',
              fontWeight: 500,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              padding: isSmallMobile ? '12px 14px' : '16.5px 14px',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'var(--info)',
            },
            marginBottom: isSmallMobile ? '0.5rem' : '1rem',
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          className={styles.submitButton}
          sx={{
            mt: isSmallMobile ? 2 : 3,
            background: 'linear-gradient(to right, var(--info), var(--success))',
            textTransform: 'none',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            padding: isSmallMobile ? '10px' : '12px',
            fontSize: isSmallMobile ? '0.9rem' : '1rem',
            '&:hover': {
              background: 'linear-gradient(to right, var(--info-dark), var(--success-dark))',
              boxShadow: 'var(--shadow-lg)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
    </Paper>
  );
};

export default AuthForm;
