import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';
import Lobby from './components/Lobby';
import GameRoom from './components/GameRoom';
import { LoadingScreen } from './components/common/LoadingScreen';
import { useAuth } from './contexts/AuthContext';

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
    element: <ProtectedRoute><Lobby /></ProtectedRoute>,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/:gameId',
    element: <ProtectedRoute><GameRoom /></ProtectedRoute>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
