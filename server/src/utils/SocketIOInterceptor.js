/**
 * SocketIOInterceptor - Intercepts Socket.IO broadcasts to relay them to virtual sockets
 * This allows virtual sockets to receive all game updates without modifying existing services
 */

class SocketIOInterceptor {
  constructor() {
    this.virtualSocketsByRoom = new Map();
  }

  /**
   * Intercept Socket.IO's emit and to methods to capture broadcasts
   * @param {Object} io - Socket.IO instance
   */
  interceptSocketIO(io) {
    if (!io) return;

    const self = this;
    const originalTo = io.to.bind(io);
    
    io.to = function(room) {
      const roomInstance = originalTo(room);
      const originalRoomEmit = roomInstance.emit.bind(roomInstance);
      
      roomInstance.emit = function(event, data) {
        originalRoomEmit(event, data);
        self.emitToVirtualSockets(room, event, data);
      };
      
      return roomInstance;
    };

    const originalEmit = io.emit.bind(io);
    io.emit = function(event, data) {
      originalEmit(event, data);
      self.emitToAllVirtualSockets(event, data);
    };
  }

  /**
   * Add a virtual socket to a room
   * @param {VirtualSocket} virtualSocket - The virtual socket
   * @param {string} room - Room name/ID
   */
  joinRoom(virtualSocket, room) {
    if (!this.virtualSocketsByRoom.has(room)) {
      this.virtualSocketsByRoom.set(room, new Set());
    }
    this.virtualSocketsByRoom.get(room).add(virtualSocket);
  }

  leaveRoom(virtualSocket, room) {
    const sockets = this.virtualSocketsByRoom.get(room);
    if (sockets) {
      sockets.delete(virtualSocket);
      if (sockets.size === 0) {
        this.virtualSocketsByRoom.delete(room);
      }
    }
  }

  /**
   * Remove a virtual socket from all rooms
   * @param {VirtualSocket} virtualSocket - The virtual socket
   */
  removeSocket(virtualSocket) {
    for (const [room, sockets] of this.virtualSocketsByRoom) {
      sockets.delete(virtualSocket);
      if (sockets.size === 0) this.virtualSocketsByRoom.delete(room);
    }
  }

  /**
   * Emit to virtual sockets in a specific room
   * @param {string} room - Room name
   * @param {string} event - Event name
   * @param {any} data - Event data
   */
  emitToVirtualSockets(room, event, data) {
    const sockets = this.virtualSocketsByRoom.get(room);
    if (sockets?.size > 0) {
      for (const socket of sockets) {
        if (socket.connected) setImmediate(() => socket.emit(event, data));
      }
    }
  }

  emitToAllVirtualSockets(event, data) {
    for (const sockets of this.virtualSocketsByRoom.values()) {
      for (const socket of sockets) {
        if (socket.connected) setImmediate(() => socket.emit(event, data));
      }
    }
  }
}

// Export singleton instance
module.exports = new SocketIOInterceptor();