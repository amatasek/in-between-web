import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoadingScreen } from './components/common/LoadingScreen';
import { useAuth } from './contexts/AuthContext';
import { LobbyProvider } from './contexts/LobbyContext';

// Lazy load routes for code splitting
const AuthPage = lazy(() => import('./components/auth/AuthPage'));
const Lobby = lazy(() => import('./components/Lobby'));
const GameRoom = lazy(() => import('./components/GameRoom'));

// Auth protection wrapper component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen message="Checking authentication..." />;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

// Define the router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <LobbyProvider>
          <Suspense fallback={<LoadingScreen message="Loading..." />}>
            <Lobby />
          </Suspense>
        </LobbyProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<LoadingScreen message="Loading..." />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: '/:gameId',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingScreen message="Loading..." />}>
          <GameRoom />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
