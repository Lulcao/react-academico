// AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type UserRole = 'professor' | 'aluno' | null;

interface AuthContextData {
  isLoggedIn: boolean;
  userRole: UserRole;
  username: string | null;
  nome: string | null;
  sobrenome: string | null;
  periodo: number | null;
  login: (role: UserRole, username: string, nome: string, sobrenome: string, periodo: number) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  userRole: null,
  username: null,
  nome: null,
  sobrenome: null,
  periodo: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [periodo, setPeriodo] = useState<number | null>(null);
  const [sobrenome, setSobrenome] = useState<string | null>(null);

  const login = (role: UserRole, username: string, nome: string, sobrenome: string, periodo: number) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUsername(username);
    setNome(nome);
    setSobrenome(sobrenome);
    setPeriodo(periodo);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUsername(null);
    setNome(null);
    setSobrenome(null);
    setPeriodo(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, username, nome, sobrenome, periodo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
