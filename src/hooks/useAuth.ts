import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { authService, AuthUser } from '../services/authService';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    authService.getCurrentSession().then(({ session, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      } else {
        setSession(session);
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name,
            role: session.user.user_metadata?.role || 'user'
          });
        }
      }
      setLoading(false);
    });

    // Set up auth state listener
    const { data: { subscription } } = authService.onAuthStateChange((session, user) => {
      setSession(session);
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: {
    name?: string;
    role?: string;
  }) => {
    setLoading(true);
    const result = await authService.signUp(email, password, userData);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Account created successfully! Please check your email to confirm your account.');
    }
    
    setLoading(false);
    return result;
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await authService.signIn(email, password);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Signed in successfully!');
    }
    
    setLoading(false);
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    const result = await authService.signOut();
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Signed out successfully!');
    }
    
    setLoading(false);
    return result;
  };

  const updateProfile = async (updates: {
    name?: string;
    role?: string;
    [key: string]: any;
  }) => {
    setLoading(true);
    const result = await authService.updateProfile(updates);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Profile updated successfully!');
    }
    
    setLoading(false);
    return result;
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAdmin: authService.isAdmin(user),
    isAuthenticated: !!user
  };
};