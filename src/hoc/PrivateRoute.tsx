import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import type { JSX } from 'react';

// создание приватных страницы

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};
