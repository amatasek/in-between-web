/**
 * IN-BETWEEN CARD GAME - SERVER ENTRY POINT
 * 
 * This is a minimal entry point for the card game server.
 * All game logic is delegated to service modules.
 */

// Import required modules
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');

// Import our service modules
const GameService = require('./src/services/GameService');
const SocketService = require('./src/services/SocketService');
const authRoutes = require('./src/routes/auth');
const balanceRoutes = require('./src/routes/balance');

// Create and configure Express app
const app = express();

// Configure CORS
app.use(cors({
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add CORS headers to all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Mount routes
app.use('/auth', authRoutes);
app.use('/balance', balanceRoutes);

// Static file serving
app.use(express.static(path.join(__dirname, '../web/public')));

// Create HTTP server
const server = http.createServer(app);

// Initialize our Socket Service with the server instance
SocketService.initialize(server);

// API Routes

// Get list of available games
app.get('/api/games', (req, res) => {
  res.json({ games: GameService.getAvailableGames() });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    time: new Date().toISOString(),
    activeGames: Object.keys(GameService.games).length,
    connectedSockets: SocketService.connectedSockets.size,
    version: '2.0.0'
  });
});

// Schedule cleanup tasks
const CLEANUP_INTERVAL = 1000 * 60 * 30; // 30 minutes
setInterval(() => {
  console.log('[SERVER] Running scheduled cleanup');
  GameService.cleanupGames();
}, CLEANUP_INTERVAL);

// Start the server on port 3002 to avoid conflicts
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`[SERVER] In-Between Card Game server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log('[SERVER] Shutting down gracefully...');
  
  server.close(() => {
    console.log('[SERVER] Server closed successfully');
    process.exit(0);
  });
  
  // Force exit after timeout
  setTimeout(() => {
    console.error('[SERVER] Forcing shutdown after timeout');
    process.exit(1);
  }, 5000);
}
