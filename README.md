# In-Between Web Client

Open source React UI for the In-Between card game.

## Overview

This repository contains the web client for In-Between, a real-time multiplayer card game. The UI is built with React and Vite, featuring a modern, responsive design with real-time updates via Socket.IO.

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: CSS Modules
- **Real-time**: Socket.IO client
- **Routing**: React Router
- **State Management**: React Context API

## Features

- 🎮 Real-time multiplayer gameplay
- 🎨 Modern, responsive UI design
- 🔐 JWT-based authentication
- 🎵 Interactive sound effects
- 📱 Mobile-friendly interface
- ⚡ WebSocket communication
- 🎯 Gamepad support
- 💰 In-game currency system

## Project Structure

```
web/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React Context providers
│   ├── styles/         # Component styles (CSS Modules)
│   ├── services/       # API and service layers
│   ├── hooks/          # Custom React hooks
│   └── constants/      # UI constants
├── public/             # Static assets
└── vite.config.js      # Vite configuration
```

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

The client expects a backend API at `http://localhost:3001` during development. Update `src/config.js` to point to your backend server.

## Backend API

This UI requires a compatible backend server implementing the In-Between game logic and Socket.IO events. The backend should provide:
- Authentication endpoints (`/auth/*`)
- Game management (`/games/*`)
- User preferences (`/preferences/*`)
- WebSocket events for real-time gameplay

## Contributing

Contributions are welcome! Please raise an issue or submit a pull request.