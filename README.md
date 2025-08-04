# In Between Card Game

**Play now at [in-between.live](https://in-between.live)**

## Stack
- Frontend: React/Next.js
- Backend: Node.js + Express + Socket.io
- Database: CouchDB (with nano client)
- Authentication: Custom JWT-based auth

## First Time Setup
```bash
# Install dependencies for web client
cd web && npm install

# Install dependencies for server
cd ../server && npm install
```

## Development
```bash
# Start the server (in one terminal)
cd server && npm start

# Start the web client (in another terminal)
cd web && npm run dev
```

## Features
- Real-time multiplayer card game
- User authentication system
- Persistent game state
- Modern, responsive UI
- WebSocket-based communication
