class NotificationService {
  constructor() {
    this.io = null;
    this.connectionService = null;
  }

  setServiceRegistry(serviceRegistry) {
    this.serviceRegistry = serviceRegistry;
  }
  
  init() {
    this.connectionService = this.serviceRegistry.get('connection');
    if (this.connectionService) {
      this.io = this.connectionService.io;
    }
    console.log('[NotificationService] Initialized');
  }

  /**
   * Send a notification to all connected users
   * @param {string} title - The notification title
   * @param {string} message - The notification message
   * @param {string} emoji - The emoji/icon to display
   * @param {string} color - The color theme
   * @param {number} duration - How long to show the notification (ms)
   */
  notifyAllPlayers(title, message, emoji = 'ℹ', color = '#3498db', duration = 4000) {
    if (!this.io) return;
    
    this.io.emit('toast', {
      title,
      message,
      emoji,
      color,
      duration,
      timestamp: Date.now()
    });
  }

  /**
   * Send a notification to all players in a specific game room
   * @param {string} gameId - The game room ID
   * @param {string} title - The notification title
   * @param {string} message - The notification message
   * @param {string} emoji - The emoji/icon to display
   * @param {string} color - The color theme
   * @param {number} duration - How long to show the notification (ms)
   * @param {string} excludeUserId - User ID to exclude from notification
   */
  notifyRoom(gameId, title, message, emoji = '🎮', color = '#9b59b6', duration = 4000, excludeUserId = null) {
    // Try to get io instance if not available
    if (!this.io && this.connectionService) {
      this.io = this.connectionService.io;
    }
    
    if (!this.io) {
      console.error('[NotificationService] No io instance available');
      return;
    }
    
    const toastData = {
      title,
      message,
      emoji,
      color,
      duration,
      timestamp: Date.now()
    };

    if (excludeUserId && this.connectionService) {
      const excludeSocketId = this.connectionService.getUserSocketId(excludeUserId);
      if (excludeSocketId) {
        this.io.to(gameId).except(excludeSocketId).emit('toast', toastData);
        return;
      }
    }
    
    this.io.to(gameId).emit('toast', toastData);
  }

  /**
   * Send a notification to a specific user
   * @param {string} userId - The user's ID
   * @param {string} title - The notification title
   * @param {string} message - The notification message
   * @param {string} emoji - The emoji/icon to display
   * @param {string} color - The color theme
   * @param {number} duration - How long to show the notification (ms)
   */
  notifyPlayer(userId, title, message, emoji = 'ℹ', color = '#3498db', duration = 4000) {
    if (!this.connectionService) return;
    
    const socketId = this.connectionService.getUserSocketId(userId);
    if (socketId && this.io) {
      this.io.to(socketId).emit('toast', {
        title,
        message,
        emoji,
        color,
        duration,
        timestamp: Date.now()
      });
    }
  }

}

module.exports = new NotificationService();