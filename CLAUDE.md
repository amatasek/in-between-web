# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Available Commands

### Web Client (React + Vite)
```bash
cd web
npm run build  # Build for production
```

### Server (Node.js + Express + Socket.IO)
```bash
cd server
# No specific build/lint commands - direct Node.js execution
```

### Sound Manager (Electron Admin Tool)
```bash
cd admin/sound-manager
npm run build          # Build web assets
npm run electron:build # Build and package Electron app
```

## Architecture Overview

This is a real-time multiplayer card game ("In-Between") with a service-oriented architecture:

### Service-Oriented Backend
The server uses a **ServiceRegistry pattern** with 15+ specialized services:
- Core services: `GameService`, `ConnectionService`, `DatabaseService`, `AuthService`
- Game logic: `GameStateService`, `PlayerManagementService`, `BettingService`, `CardService`
- Support: `BroadcastService`, `GameEventService`, `GameTransactionService`

Services are registered in `ServiceRegistry` and can reference each other through dependency injection.

### React Context Architecture
The web client uses React Context for state management:
- `AuthContext` - Authentication state
- `SocketContext` - WebSocket connection
- `GameContext` - Active game state
- `LobbyContext` - Game lobby state
- `PreferencesContext` - User settings

### Real-Time Communication
- Socket.IO handles WebSocket connections between client and server
- Game events are broadcast to all players in a room
- JWT tokens used for authentication over WebSockets

### Shared Constants
`/shared/constants/` contains game constants used by both client and server:
- `GameConstants.js` - Game rules, timers, betting limits (dual CommonJS/ES6 support)
- `GamePhases.js` - Game state constants

### Database
- **PouchDB** (NoSQL document store) for all data persistence
- `DatabaseService` handles all database operations
- Models in `/server/src/models/` define data schemas

### File Structure
- `/web/` - React frontend with CSS Modules
- `/server/` - Node.js backend with service architecture
- `/admin/sound-manager/` - Electron app for managing game sounds
- `/shared/` - Constants shared between client and server
- `/server/assets/` - Game assets (sounds, images)

### Development Notes
- Frontend runs on port 3000, backend on port 3001
- Vite proxy configuration handles API and WebSocket requests during development
- CSS Modules provide component-scoped styling

### Key Patterns
- Service Registry for dependency injection
- React Context for client state management
- Socket.IO for real-time multiplayer functionality
- CSS Modules for scoped component styling
- JWT authentication for both HTTP and WebSocket connections