import React, { createContext, useState, useContext, ReactNode } from 'react';

export type UserRole = 'professor' | 'aluno' | null;

interface AuthContextData {
  isLoggedIn: boolean;
  userRole: UserRole;
  userEmail: string | null;  // Novo campo para o email
  login: (role: UserRole, email: string) => void;  // Altere a assinatura da função login
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  userRole: null,
  userEmail: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null); // Novo estado para o email

  // Função de login que agora recebe o email corretamente
  const login = (role: UserRole, email: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(email); // Atualiza o email do usuário
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail(null); // Limpa o email ao sair
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
