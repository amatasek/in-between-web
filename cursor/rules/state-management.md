# State Management

## React State
- Use local component state for UI-specific state
- Use React Context for shared state across components
- Minimize prop drilling by using Context appropriately
- Separate UI state from application/domain state

## Context Organization
- Create separate contexts for different domains
- Provide a clear API for each context
- Co-locate related state and actions within contexts
- Use context providers at the appropriate level in the component tree

## Custom Hooks
- Create custom hooks for complex state logic
- Name hooks with the `use` prefix
- Focus hooks on a single responsibility
- Make hooks reusable across components

## Data Fetching
- Use async/await for data fetching
- Implement loading and error states
- Cache responses where appropriate
- Handle race conditions in concurrent requests

## Socket State
- Separate socket connection logic from data consumption
- Create dedicated hooks for socket interactions
- Handle socket disconnections and reconnections gracefully
- Update UI state efficiently when receiving socket events

## Example Context

```tsx
// GameContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';
import { Game, Player } from '@/types';

interface IGameContextValues {
  game: Game | null;
  players: Player[];
  isLoading: boolean;
  error: string | null;
  startGame: () => void;
  joinGame: (gameId: string) => void;
  leaveGame: () => void;
}

const GameContext = createContext<IGameContextValues | undefined>(undefined);

export const GameProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { socket } = useSocket();
  
  // Context implementation...
  
  const value = {
    game,
    players,
    isLoading,
    error,
    startGame,
    joinGame,
    leaveGame
  };
  
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): IGameContextValues => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
``` 