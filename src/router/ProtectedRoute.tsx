import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { selectIsAuthenticated, selectUser } from '../store/slices/authSlice';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to sign in page with return URL
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    // Redirect non-admin users to home page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}