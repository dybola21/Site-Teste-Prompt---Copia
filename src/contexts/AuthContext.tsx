import React, { createContext, useContext, useEffect, useState } from 'react';

export interface MockUser {
  uid: string;
  email: string | null;
}

interface AuthContextType {
  user: MockUser | null;
  role: 'admin' | 'employee' | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [role, setRole] = useState<'admin' | 'employee' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setRole('admin');
    }
    setLoading(false);
  }, []);

  const login = (email: string) => {
    const mockUser = { uid: 'mock-123', email };
    setUser(mockUser);
    setRole('admin');
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('mockUser');
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, login }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
