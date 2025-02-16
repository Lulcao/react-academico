// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type UserRole = 'professor' | 'aluno' | null;

interface AuthContextData {
  isLoggedIn: boolean;
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

// Define o tipo das props do AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  userRole: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  const login = (role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
