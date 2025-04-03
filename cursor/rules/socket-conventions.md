# WebSocket Conventions

## Event Naming
- Use descriptive, action-based event names
- Follow the pattern: `[resource]:[action]` (e.g., `game:start`, `player:join`)
- Use camelCase for event names
- Prefix client-to-server events with `client:` and server-to-client events with `server:`

## Data Format
- All messages should be JSON objects
- Include metadata with each message:
  ```json
  {
    "type": "event:name",
    "timestamp": 1633022400000,
    "payload": { ... }
  }
  ```

## Room Management
- Join game-specific rooms using game ID
- Use namespaced rooms for different types of communication
- Leave rooms when disconnecting or changing games

## Error Handling
- Emit error events back to the client when issues occur
- Include detailed error information:
  ```json
  {
    "type": "server:error",
    "timestamp": 1633022400000,
    "payload": {
      "code": "ERROR_CODE",
      "message": "Error message",
      "originalEvent": "client:attemptedAction"
    }
  }
  ```

## Authentication
- Authenticate socket connections using the same JWT as REST API
- Validate socket authentication on connection and for privileged actions
- Store user information in socket for easy access

## Performance
- Throttle high-frequency events
- Batch updates when possible
- Use binary transmission for large data sets 