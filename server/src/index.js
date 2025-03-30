/**
 * In-Between Card Game - Main Server Entry Point
 * This file initializes the Express server, Socket.IO, 
 * and connects all the services together
 */
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Import config
const config = require('./config');

// Import services
const SocketService = require('./services/SocketService');
const GameService = require('./services/GameService');
const authRoutes = require('./routes/auth');

// Setup Express app
const app = express();
app.use(cors({
  origin: config.corsOrigin || ['http://localhost:3000', 'http://127.0.0.1:56268', 'https://in-between.live'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount auth routes
app.use('/auth', authRoutes);

// Serve static files from the web build directory in production
if (process.env.NODE_ENV === 'production') {
  // Check multiple possible locations for the web build
  const possibleBuildPaths = [
    path.join(__dirname, '../../web/build'),
    path.join(__dirname, '../../../web/build'),
    '/opt/render/project/src/web/build'
  ];
  
  let webBuildPath = null;
  
  // Find the first path that exists
  for (const buildPath of possibleBuildPaths) {
    if (fs.existsSync(buildPath)) {
      const indexPath = path.join(buildPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        webBuildPath = buildPath;
        console.log(`Found web build at: ${webBuildPath}`);
        break;
      }
    }
  }
  
  if (webBuildPath) {
    app.use(express.static(webBuildPath));
    
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/') || req.path.startsWith('/auth/')) {
        return next();
      }
      res.sendFile(path.join(webBuildPath, 'index.html'));
    });
  } else {
    console.log('No web build directory found. Running in API-only mode.');
  }
}

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO service
SocketService.initialize(server);

// API route to get available games
app.get('/api/games', (req, res) => {
  const availableGames = GameService.getAvailableGames();
  res.json({ games: availableGames });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    activeGames: Object.keys(GameService.games).length,
    connectedSockets: SocketService.connectedSockets.size
  });
});

// Set up scheduled cleanup tasks
const CLEANUP_INTERVAL_MS = 1000 * 60 * 10; // Run cleanup every 10 minutes
setInterval(() => {
  console.log('[SERVER] Running scheduled cleanup tasks');
  GameService.cleanupGames();
}, CLEANUP_INTERVAL_MS);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`[SERVER] In-Between Card Game server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log('[SERVER] Shutting down gracefully...');
  
  // Clean up all game timeouts
  Object.values(GameService.games).forEach(game => {
    if (game.timeouts && game.timeouts.length > 0) {
      console.log(`Clearing ${game.timeouts.length} timeouts for game ${game.id}`);
      game.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
      game.timeouts = [];
    }
  });
  
  // Close the HTTP server
  server.close(() => {
    console.log('[SERVER] Server closed successfully');
    process.exit(0);
  });
  
  // Force exit after timeout if server doesn't close gracefully
  setTimeout(() => {
    console.error('[SERVER] Forcing shutdown after timeout');
    process.exit(1);
  }, 5000);
}

module.exports = app;
