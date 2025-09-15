import { supabase } from '../integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  session: Session | null;
  error: string | null;
}

class AuthService {
  // Sign up with email and password
  async signUp(email: string, password: string, userData?: {
    name?: string;
    role?: string;
  }): Promise<AuthResponse> {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData || {}
        }
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      const user = data.user ? {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role || 'user'
      } : null;

      return { user, session: data.session, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, session: null, error: 'Failed to sign up' };
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      const user = data.user ? {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role || 'user'
      } : null;

      return { user, session: data.session, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, session: null, error: 'Failed to sign in' };
    }
  }

  // Sign out
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      // Clear any remaining local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      
      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: 'Failed to sign out' };
    }
  }

  // Get current session
  async getCurrentSession(): Promise<{ session: Session | null, error: string | null }> {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        return { session: null, error: error.message };
      }

      return { session: data.session, error: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error: 'Failed to get session' };
    }
  }

  // Get current user
  async getCurrentUser(): Promise<{ user: AuthUser | null, error: string | null }> {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        return { user: null, error: error.message };
      }

      const user = data.user ? {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role || 'user'
      } : null;

      return { user, error: null };
    } catch (error) {
      console.error('Get user error:', error);
      return { user: null, error: 'Failed to get user' };
    }
  }

  // Update user profile
  async updateProfile(updates: {
    name?: string;
    role?: string;
    [key: string]: any;
  }): Promise<{ user: AuthUser | null, error: string | null }> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) {
        return { user: null, error: error.message };
      }

      const user = data.user ? {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role || 'user'
      } : null;

      return { user, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { user: null, error: 'Failed to update profile' };
    }
  }

  // Check if user is admin
  isAdmin(user: AuthUser | null): boolean {
    return user?.role === 'admin';
  }

  // Set up auth state listener
  onAuthStateChange(callback: (session: Session | null, user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.user_metadata?.name,
        role: session.user.user_metadata?.role || 'user'
      } : null;

      callback(session, user);
    });
  }
}

export const authService = new AuthService();