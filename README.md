# In-Between Web Client

Open source React UI for the In-Between card game.

## Overview

This repository contains the web client and mobile apps (iOS & Android) for In-Between, a real-time multiplayer card game. The UI is built with React and Vite, featuring a modern, responsive design with real-time updates via Socket.IO.

## Tech Stack

- **Framework**: React 18, Vite, Capacitor
- **Styling**: CSS Modules
- **Real-time**: Socket.IO client
- **Routing**: React Router
- **State Management**: React Context API
- **OTA Updates**: Capgo
- **Native Builds**: Firebase

## Features

- 🎮 Real-time multiplayer gameplay
- 🎨 Modern, responsive UI design
- 🔐 JWT-based authentication
- 🎵 Interactive sound effects
- 📱 Mobile apps (iOS & Android via Capacitor)
- ⚡ WebSocket communication
- 🎯 Gamepad support
- 💰 In-game currency system
- 🚀 Live OTA updates (Capgo)

## Mobile Apps

This web client is packaged as native iOS and Android apps using Capacitor.

### Updates

- **Web code updates**: Automated OTA updates via Capgo
- **Native builds**: Manual distribution via Firebase App Distribution when needed

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

The client expects an instance of `am-games-api running at `http://localhost:3001` during development. Update `src/config.js` to point to your backend server.

## Contributing

Contributions are welcome! Please raise an issue or submit a pull request.