const authService = require('../services/AuthService');

function authMiddleware(socket, next) {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Authentication required'));
  }

  try {
    const decoded = authService.verifyToken(token);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error('Invalid token'));
  }
}

module.exports = authMiddleware;
