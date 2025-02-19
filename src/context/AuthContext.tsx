import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'professor' | 'aluno' | null;

interface AuthContextData {
  isLoggedIn: boolean;
  userRole: UserRole;
  userEmail: string | null;
  login: (role: UserRole, userEmail: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  userRole: null,
  userEmail: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const loggedInString = await AsyncStorage.getItem('isLoggedIn');
        if (loggedInString === 'true') {
          setIsLoggedIn(true);
          const role = await AsyncStorage.getItem('userRole');
          setUserRole(role as UserRole);
          const email = await AsyncStorage.getItem('userEmail');
          setUserEmail(email);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const login = async (role: UserRole, userEmail: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(userEmail);

    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userRole', role ?? '');
      await AsyncStorage.setItem('userEmail', userEmail);
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage no login:', error);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail(null);

    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userEmail');
    } catch (error) {
      console.error('Erro ao remover dados do AsyncStorage no logout:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, userEmail, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
