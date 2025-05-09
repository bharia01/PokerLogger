import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Try to restore user session on load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiFetch('/auth/me', 'GET', undefined, token);
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.warn('Session expired or token invalid: ', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔐 Login
  const login = async (email: string, password: string) => {
    const res = await apiFetch('/auth/login', 'POST', { email, password });
    const data = await res.json();
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  // 🔓 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
