#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Start Vite dev server
const vite = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true
});

// Wait a bit for Vite to start
setTimeout(() => {
  // Start Electron
  const electron = spawn('npx', ['electron', '.'], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  });

  // Handle process exit
  electron.on('close', (code) => {
    vite.kill();
    process.exit(code);
  });

  vite.on('close', (code) => {
    electron.kill();
    process.exit(code);
  });
}, 2000);

// Handle process termination
process.on('SIGINT', () => {
  vite.kill();
  process.exit(0);
});
