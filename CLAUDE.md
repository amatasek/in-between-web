# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Available Commands

### Web Client (React + Vite)
```bash
cd web
npm run dev    # Start development server
npm run build  # Build for production
```

### Sound Manager (Electron Admin Tool)
```bash
cd admin/sound-manager
npm run build          # Build web assets
npm run electron:build # Build and package Electron app
```

## Architecture Overview

This repository contains the web client UI for the In-Between card game, built with React and modern web technologies.

### React Context Architecture

The web client uses React Context for state management:
- `AuthContext` - Authentication state and user data
- `SocketContext` - WebSocket connection management
- `GameContext` - Active game state
- `LobbyContext` - Game lobby and available games
- `PreferencesContext` - User settings and preferences
- `ToastContext` - Toast notifications
- `VirtualKeyboardContext` - Virtual keyboard for mobile/gamepad

### Component Structure

- **Auth Components** (`/components/auth/`) - Login and registration forms
- **Game Components** (`/components/`) - Game UI elements like cards, betting panels, player lists
- **Common Components** (`/components/common/`) - Reusable UI components
- **Modal Components** - Game settings, rules, stats, store modals
- **Icons** (`/icons/`) - Custom SVG icon components

### Styling

- **CSS Modules** for component-scoped styling
- Global styles in `/styles/global.css`
- CSS variables in `/styles/variables.css`
- Responsive design with mobile-first approach

### Real-Time Communication

- Socket.IO client for WebSocket connection
- Automatic reconnection handling
- JWT authentication over WebSockets
- Event-based communication with backend

### Services

- `SoundService` - Manages game sound effects and audio sprites
- `StoreService` - Handles in-game store and purchases

### Key Features

- 🎮 Real-time multiplayer gameplay UI
- 🎯 Gamepad navigation support
- ⌨️ Virtual keyboard for text input
- 🎵 Dynamic sound effects
- 📱 Mobile-responsive design
- 💰 In-game currency display
- 🏆 Achievement notifications
- 📊 Player statistics and leaderboards

### File Structure

```
web/
├── src/
│   ├── components/        # React components
│   ├── contexts/          # React Context providers
│   ├── styles/            # Component styles (CSS Modules)
│   ├── services/          # Client-side services
│   ├── hooks/             # Custom React hooks
│   ├── icons/             # SVG icon components
│   ├── constants.js       # All game and UI constants
│   ├── config.js          # Client configuration
│   ├── router.jsx         # React Router setup
│   └── main.jsx           # App entry point
├── public/                # Static assets
└── vite.config.js         # Vite configuration
```

### Constants

`/src/constants.js` contains all game and UI constants for the frontend:
- Game phase constants (WAITING, DEALING, BETTING, etc.)
- Game configuration (timers, ante amount, max seats, etc.) 
- UI icons and elements

Both frontend and backend now maintain their own constants files independently.

### Development Notes

- Frontend runs on port 3000 in development
- Vite proxy configuration forwards API calls to backend (port 3001)
- Hot module replacement for rapid development
- CSS Modules prevent style conflicts
- React strict mode enabled for better debugging

### Configuration

- Update `src/config.js` to change backend URL
- Vite proxy settings in `vite.config.js` for development
- Environment variables supported via `.env` files