import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export interface UserProfile {
  name: string;
  email: string;
  avatarIndex: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile | null;
  supabaseUser: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  setAvatar: (index: number) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AVATARS = [
  "🐉", "🦊", "🐺", "🦅", "🐱", "🎮", "⚔️", "🛡️", "🔥", "💀", "👾", "🤖",
];

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Build UserProfile from Supabase user
  const buildProfile = (u: User | null): UserProfile | null => {
    if (!u) return null;
    const meta = u.user_metadata || {};
    return {
      name: meta.full_name || meta.name || u.email?.split("@")[0] || "",
      email: u.email || "",
      avatarIndex,
    };
  };

  useEffect(() => {
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      setUser(buildProfile(session?.user ?? null));
      setLoading(false);
    });

    // Then get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      setUser(buildProfile(session?.user ?? null));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update user profile when avatarIndex changes
  useEffect(() => {
    if (supabaseUser) {
      setUser(prev => prev ? { ...prev, avatarIndex } : null);
    }
  }, [avatarIndex, supabaseUser]);

  const isLoggedIn = !!session;

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signUp = async (email: string, password: string, name: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setSupabaseUser(null);
  };

  const setAvatar = (index: number) => {
    setAvatarIndex(index);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) setUser({ ...user, ...profile });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, supabaseUser, session, loading, login, signUp, logout, setAvatar, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
