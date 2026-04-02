import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, phone: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: (User & { password: string })[] = [
  { id: '1', name: 'John Doe', email: 'user@demo.com', phone: '+1234567890', role: 'user', createdAt: '2026-01-01', password: 'password' },
  { id: '2', name: 'Admin User', email: 'admin@demo.com', phone: '+1987654321', role: 'admin', createdAt: '2025-06-01', password: 'admin123' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const found = mockUsers.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, _password: string, phone: string) => {
    const newUser: User = { id: Date.now().toString(), name, email, phone, role: 'user', createdAt: new Date().toISOString() };
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === 'admin', login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
