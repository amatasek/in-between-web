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
    <Paper className={styles.authForm} elevation={3}>
      <Typography variant="h5" component="h2" gutterBottom>
        {mode === 'login' ? 'Login' : 'Register'}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
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
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
    </Paper>
  );
};

export default AuthForm;
