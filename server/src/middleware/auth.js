const { serviceRegistry } = require('../serviceIntegration');

/**
 * WebSocket authentication middleware
 * @param {Object} socket - Socket.io socket
 * @param {Function} next - Next function
 */
function socketAuthMiddleware(socket, next) {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Authentication required'));
  }

  try {
    const authService = serviceRegistry.get('auth');
    const decoded = authService.verifyToken(token);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error('Invalid token'));
  }
}

/**
 * HTTP authentication middleware
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next function
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const authService = serviceRegistry.get('auth');
    const decoded = authService.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = {
  socketAuthMiddleware,
  authenticateToken
};
