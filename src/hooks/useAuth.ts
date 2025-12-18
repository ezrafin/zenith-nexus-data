import { useState, useEffect, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  reputation: number;
  post_count: number;
  comment_count: number;
  privacy_level: 'public' | 'private' | 'friends';
}

interface UseAuthReturn {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
}

const PROFILE_LOAD_TIMEOUT = 10000; // 10 seconds

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  // Cleanup function for timeout
  const clearLoadingTimeout = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  // Set a safety timeout to prevent infinite loading
  const setLoadingWithTimeout = () => {
    clearLoadingTimeout();
    loadingTimeoutRef.current = setTimeout(() => {
      console.warn('Auth loading timeout - forcing loading state to false');
      setLoading(false);
    }, PROFILE_LOAD_TIMEOUT);
  };

  useEffect(() => {
    // Prevent double initialization in React strict mode
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Set initial loading timeout
    setLoadingWithTimeout();

    // CRITICAL: Set up auth state listener FIRST (synchronous updates only!)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log('Auth state change:', event, currentSession?.user?.id);
      
      // Synchronous state updates only - no async operations here!
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setLoading(false);
        clearLoadingTimeout();
        return;
      }

      if (currentSession?.user) {
        // Defer profile loading with setTimeout to avoid deadlock
        setTimeout(() => {
          loadProfile(currentSession.user.id);
        }, 0);
      } else {
        setProfile(null);
        setLoading(false);
        clearLoadingTimeout();
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      console.log('Initial session check:', existingSession?.user?.id);
      
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      
      if (existingSession?.user) {
        // Defer profile loading
        setTimeout(() => {
          loadProfile(existingSession.user.id);
        }, 0);
      } else {
        setLoading(false);
        clearLoadingTimeout();
      }
    }).catch((error) => {
      console.error('Error getting session:', error);
      setLoading(false);
      clearLoadingTimeout();
    });

    return () => {
      subscription.unsubscribe();
      clearLoadingTimeout();
    };
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      console.log('Loading profile for:', userId);
      
      const { data, error } = await (supabase
        .from('profiles' as any)
        .select('*')
        .eq('id', userId)
        .maybeSingle() as any);

      if (error) {
        console.error('Profile load error:', error);
        throw error;
      }
      
      if (data) {
        setProfile({
          id: data.id,
          username: data.username,
          display_name: data.display_name,
          bio: data.bio,
          avatar_url: data.avatar_url,
          reputation: data.reputation_score || 0,
          post_count: data.posts_count || 0,
          comment_count: 0,
          privacy_level: data.privacy_level || 'public',
        });
        console.log('Profile loaded successfully');
      } else {
        console.log('No profile found for user');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
      clearLoadingTimeout();
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setLoadingWithTimeout();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      clearLoadingTimeout();
    }
    return { error };
  };

  const signUp = async (email: string, password: string, username?: string) => {
    setLoading(true);
    setLoadingWithTimeout();
    const redirectUrl = `${window.location.origin}/auth/callback`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          username: username || email.split('@')[0],
          display_name: username || email.split('@')[0],
        },
      },
    });
    
    if (error) {
      setLoading(false);
      clearLoadingTimeout();
    }
    return { error };
  };

  const signOut = async () => {
    console.log('Signing out...');
    
    // Clear state immediately for responsive UI
    setUser(null);
    setProfile(null);
    setSession(null);
    
    try {
      // Sign out from all devices/tabs
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.error('Sign out error:', error);
      }
    } catch (error) {
      console.error('Sign out exception:', error);
    }
    
    setLoading(false);
    console.log('Sign out complete');
  };

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    // Use production domain for OAuth redirect
    const productionDomain = 'https://investopatronus.com';
    const redirectUrl = `${productionDomain}/auth/callback`;
    console.log('OAuth redirect URL:', redirectUrl);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { 
        redirectTo: redirectUrl,
        skipBrowserRedirect: false,
      },
    });
    
    if (error) {
      console.error('OAuth error:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { error } = await (supabase
      .from('profiles' as any)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id) as any);

    if (!error) {
      // Reload profile after update
      await loadProfile(user.id);
    }
    return { error };
  };

  return { user, profile, session, loading, signIn, signUp, signOut, signInWithOAuth, updateProfile };
}
