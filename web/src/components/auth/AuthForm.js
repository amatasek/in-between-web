import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import styles from './AuthForm.module.css';

const AuthForm = ({ onSubmit, mode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#3498db', fontWeight: 600 }}>
        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2, backgroundColor: 'rgba(231, 76, 60, 0.2)', color: '#ecf0f1' }}>
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
          inputProps={{ minLength: 3 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#7fbbda',
              },
              '&:hover fieldset': {
                borderColor: '#6bafd3',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7fbbda',
              },
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '& .MuiInputLabel-root': {
              color: '#7fbbda',
            },
            '& .MuiOutlinedInput-input': {
              color: '#2c3e50',
              fontWeight: 500,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3498db',
            },
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
          inputProps={{ minLength: 6 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#7fbbda',
              },
              '&:hover fieldset': {
                borderColor: '#6bafd3',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7fbbda',
              },
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '& .MuiInputLabel-root': {
              color: '#7fbbda',
            },
            '& .MuiOutlinedInput-input': {
              color: '#2c3e50',
              fontWeight: 500,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3498db',
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          className={styles.submitButton}
          sx={{
            mt: 3,
            background: 'linear-gradient(to right, #3498db, #2ecc71)',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            letterSpacing: '1px',
            padding: '12px',
            '&:hover': {
              background: 'linear-gradient(to right, #2980b9, #27ae60)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
