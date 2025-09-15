import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../admin/products/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export const AuthGuard = ({ 
  children, 
  requireAuth = false, 
  requireAdmin = false,
  redirectTo = '/login'
}: AuthGuardProps) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    // If authentication is required but user is not authenticated
    if (requireAuth && !user) {
      navigate(redirectTo, { 
        state: { from: location.pathname },
        replace: true 
      });
      return;
    }

    // If admin is required but user is not admin
    if (requireAdmin && (!user || !isAdmin)) {
      navigate('/unauthorized', { replace: true });
      return;
    }

    // If user is authenticated but trying to access auth pages, redirect to home
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/', { replace: true });
      return;
    }
  }, [user, loading, isAdmin, requireAuth, requireAdmin, navigate, location, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Don't render children if requirements are not met
  if (requireAuth && !user) return null;
  if (requireAdmin && (!user || !isAdmin)) return null;

  return <>{children}</>;
};