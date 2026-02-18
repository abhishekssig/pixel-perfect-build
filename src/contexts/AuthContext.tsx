import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
  avatarIndex: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  setAvatar: (index: number) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AVATARS = [
  "🐉", "🦊", "🐺", "🦅", "🐱", "🎮", "⚔️", "🛡️", "🔥", "💀", "👾", "🤖",
];

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem("rebel-user");
    return stored ? JSON.parse(stored) : null;
  });

  const isLoggedIn = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem("rebel-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("rebel-user");
    }
  }, [user]);

  const login = (email: string, name: string) => {
    setUser({ name, email, avatarIndex: 0 });
  };

  const logout = () => setUser(null);

  const setAvatar = (index: number) => {
    if (user) setUser({ ...user, avatarIndex: index });
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) setUser({ ...user, ...profile });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, setAvatar, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
