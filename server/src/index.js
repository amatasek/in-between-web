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

// Import service integration - only using the new service architecture
const { initializeServices, initializeSocketIO, serviceRegistry } = require('./serviceIntegration');

// Import routes
const authRoutes = require('./routes/auth');
const preferencesRoutes = require('./routes/preferences');
const gamesRoutes = require('./routes/games');

// Import service middleware
const { injectServices } = require('./middleware/serviceMiddleware');

// Setup Express app
const app = express();
// Handle CORS configuration based on environment
let corsOptions;

if (process.env.NODE_ENV === 'production') {
  // In production, use the configured origins
  const allowedOrigins = config.corsOrigin ? config.corsOrigin.split(',') : ['https://in-between.live'];
  console.log(`[SERVER] CORS allowed origins: ${allowedOrigins.join(', ')}`);
  
  corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.indexOf(origin.trim()) !== -1) {
        callback(null, true);
      } else {
        console.log(`[SERVER] CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  };
} else {
  // In development, allow all origins for easier testing
  corsOptions = {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  };
}

app.use(cors(corsOptions));

// Global OPTIONS handler for CORS preflight requests
app.options('*', (req, res) => {
  console.log(`[SERVER] Handling global OPTIONS preflight request for: ${req.path}`);
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Add CORS headers to all responses for development
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && process.env.NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize services before mounting routes
initializeServices();

// Mount routes with service injection
app.use('/auth', injectServices(['auth', 'database']), authRoutes);
app.use('/preferences', injectServices(['auth', 'database']), preferencesRoutes);
app.use('/games', injectServices(['game', 'gameHistory']), gamesRoutes);

// Use the filesPath from the already imported config
const filesDir = config.filesPath;
const assetsDir = path.join(__dirname, '../assets');

console.log(`[SERVER] Serving files from: ${filesDir} at /files endpoint`);
console.log(`[SERVER] Files directory exists: ${fs.existsSync(filesDir)}`);
if (fs.existsSync(filesDir)) {
  console.log(`[SERVER] Files in directory: ${fs.readdirSync(filesDir)}`);
}

console.log(`[SERVER] Serving assets from: ${assetsDir} at /assets endpoint`);
console.log(`[SERVER] Assets directory exists: ${fs.existsSync(assetsDir)}`);
if (fs.existsSync(assetsDir)) {
  console.log(`[SERVER] Assets in directory: ${fs.readdirSync(assetsDir)}`);
}

// Export the directories for use in other modules
app.locals.filesDir = filesDir;
app.locals.assetsDir = assetsDir;

// Create a dedicated endpoint for serving files (user uploads)
app.get('/files/*', (req, res) => {
  try {
    // Extract the file path from the URL
    const filePath = req.path.replace(/^\/files\//, '');
    const fullPath = path.join(filesDir, filePath);
    
    console.log(`[SERVER] File request: ${req.path}`);
    console.log(`[SERVER] Looking for file at: ${fullPath}`);
    
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`[SERVER] File not found: ${fullPath}`);
      
      // For debugging, list all files in the directory
      const dir = path.dirname(fullPath);
      if (fs.existsSync(dir)) {
        console.log(`[SERVER] Files in directory ${dir}:`, fs.readdirSync(dir));
      } else {
        console.log(`[SERVER] Directory does not exist: ${dir}`);
      }
      
      return res.status(404).send(`File not found: ${req.path}`);
    }
    
    // Determine content type based on file extension
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.mp3') contentType = 'audio/mpeg';
    
    // Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // Stream the file
    const fileStream = fs.createReadStream(fullPath);
    fileStream.pipe(res);
  } catch (error) {
    console.error(`[SERVER] Error serving file: ${error.message}`);
    res.status(500).send('Internal server error');
  }
});

// Create a dedicated endpoint for serving assets (game resources)
app.get('/assets/*', (req, res) => {
  try {
    // Extract the asset path from the URL
    const assetPath = req.path.replace(/^\/assets\//, '');
    const fullPath = path.join(assetsDir, assetPath);
    
    console.log(`[SERVER] Asset request: ${req.path}`);
    console.log(`[SERVER] Looking for asset at: ${fullPath}`);
    
    // Check if the asset exists
    if (!fs.existsSync(fullPath)) {
      console.log(`[SERVER] Asset not found: ${fullPath}`);
      
      // For debugging, list all files in the directory
      const dir = path.dirname(fullPath);
      if (fs.existsSync(dir)) {
        console.log(`[SERVER] Assets in directory ${dir}:`, fs.readdirSync(dir));
      } else {
        console.log(`[SERVER] Directory does not exist: ${dir}`);
      }
      
      return res.status(404).send(`Asset not found: ${req.path}`);
    }
    
    // Determine content type based on file extension
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.mp3') contentType = 'audio/mpeg';
    else if (ext === '.webm') contentType = 'audio/webm';
    
    // Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // Stream the asset
    const fileStream = fs.createReadStream(fullPath);
    fileStream.pipe(res);
  } catch (error) {
    console.error(`[SERVER] Error serving asset: ${error.message}`);
    res.status(500).send('Internal server error');
  }
});

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

// Initialize services
initializeServices();

// Initialize Socket.IO with our new service architecture
const io = initializeSocketIO(server);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const gameService = serviceRegistry.get('game');
  const connectionService = serviceRegistry.get('connection');
  
  res.json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    activeGames: Object.keys(gameService.games).length,
    connectedSockets: connectionService.connectedSockets.size
  });
});

// Set up scheduled cleanup tasks
const CLEANUP_INTERVAL_MS = 1000 * 60 * 10; // Run cleanup every 10 minutes
setInterval(() => {
  console.log('[SERVER] Running scheduled cleanup tasks');
  const gameService = serviceRegistry.get('game');
  const lobbyService = serviceRegistry.get('lobby');
  
  // Use the lobbyService to clean up empty games
  if (lobbyService && typeof lobbyService.cleanupEmptyGames === 'function') {
    lobbyService.cleanupEmptyGames();
  } else if (gameService && typeof gameService.cleanupGames === 'function') {
    // Fallback to the original cleanup method
    gameService.cleanupGames();
  }
}, CLEANUP_INTERVAL_MS);

// Verify database paths in production
if (process.env.NODE_ENV === 'production') {
  const { verifyDatabasePaths } = require('./utils/dbVerify');
  const verificationResults = verifyDatabasePaths();
  
  if (verificationResults.issues.length > 0) {
    console.error('[SERVER] Database verification issues:');
    verificationResults.issues.forEach(issue => console.error(`- ${issue}`));
  } else {
    console.log('[SERVER] Database paths verified successfully');
    console.log(`- DB Path: ${verificationResults.dbPath}`);
    console.log(`- Users DB Path: ${verificationResults.userDbPath}`);
    console.log(`- Games DB Path: ${verificationResults.gameDbPath}`);
  }
}

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
  const gameService = serviceRegistry.get('game');
  if (gameService && gameService.games) {
    Object.values(gameService.games).forEach(game => {
      if (game.timeouts && game.timeouts.length > 0) {
        console.log(`Clearing ${game.timeouts.length} timeouts for game ${game.id}`);
        game.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
        game.timeouts = [];
      }
    });
  }
  
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
