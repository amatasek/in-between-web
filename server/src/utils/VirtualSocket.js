/**
 * VirtualSocket - Simulates a WebSocket connection for bots
 * Allows bots to integrate seamlessly with existing socket-based game systems
 * without actual WebSocket overhead
 */

const EventEmitter = require('events');
const crypto = require('crypto');

class VirtualSocket extends EventEmitter {
  constructor(userId, username) {
    super();
    this.id = `bot_${crypto.randomBytes(8).toString('hex')}`;
    this.user = { userId, username };
    this.connected = true;
    this.disconnected = false;
    this.eventHandlers = new Map();
    
    // Add error handler to prevent unhandled error crashes
    this.on('error', (error) => {
      console.log(`[VIRTUAL_SOCKET] Bot ${username} received error:`, error.message);
      // Bots just log errors and continue - no need to crash
    });
    
    setTimeout(() => this.emit('connect'), 10);
  }
  
  /**
   * Emit an event (mimics Socket.IO behavior)
   * @param {string} event - Event name
   * @param {...any} args - Event arguments
   */
  emit(event, ...args) {
    const listeners = this.listeners(event);
    
    if (listeners?.length > 0) {
      setTimeout(() => super.emit(event, ...args), Math.random() * 50 + 10);
    } else {
      super.emit(event, ...args);
    }
  }
  
  /**
   * Listen for events (mimics Socket.IO behavior)
   * When services call socket.on('ready', handler), this registers the handler
   * @param {string} event - Event name
   * @param {Function} callback - Event handler
   */
  on(event, callback) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(callback);
    return super.on(event, callback);
  }
  
  /**
   * Join a Socket.IO room (for game-specific events)
   * @param {string} room - Room name/ID
   */
  join(room) {
    this.rooms = this.rooms || new Set();
    this.rooms.add(room);
    setTimeout(() => this.emit('joinRoom', room), 5);
  }
  
  leave(room) {
    this.rooms?.delete(room);
    setTimeout(() => this.emit('leaveRoom', room), 5);
  }
  
  /**
   * Disconnect the virtual socket
   */
  disconnect(reason = 'bot shutdown') {
    if (this.disconnected) return;
    
    this.connected = false;
    this.disconnected = true;
    this.removeAllListeners();
    this.eventHandlers.clear();
    this.emit('disconnect', reason);
  }
  
  /**
   * Get the socket's current rooms
   * @returns {Set} Set of room names
   */
  getRooms() {
    return this.rooms || new Set();
  }
  
  inRoom(room) {
    return this.rooms?.has(room) || false;
  }
  
  /**
   * Simulate socket authentication (sets user data)
   * @param {Object} userData - User data from JWT token
   */
  authenticate(userData) {
    this.user = { ...this.user, ...userData };
    this.authenticated = true;
    setTimeout(() => this.emit('authenticated', userData), 10);
  }
  
  /**
   * Get socket info for debugging
   * @returns {Object} Socket information
   */
  getInfo() {
    return {
      id: this.id,
      userId: this.user?.userId,
      username: this.user?.username,
      connected: this.connected,
      authenticated: this.authenticated,
      rooms: Array.from(this.rooms || [])
    };
  }
  
  simulateNetworkDelay(minMs = 50, maxMs = 200) {
    return new Promise(resolve => setTimeout(resolve, Math.random() * (maxMs - minMs) + minMs));
  }
  
  toString() {
    return `VirtualSocket(${this.user?.username || 'Unknown'}, ${this.id})`;
  }
}

module.exports = VirtualSocket;