import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'professor' | 'aluno' | null;

interface AuthContextData {
  isLoggedIn: boolean;
  userRole: UserRole;
  userEmail: string | null;
  nome: string | null;
  sobrenome: string | null;
  periodo: number | null;
  login: (role: UserRole, userEmail: string, nome: string, sobrenome: string, periodo: number) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  userRole: null,
  userEmail: null,
  nome: null,
  sobrenome: null,
  periodo: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [sobrenome, setSobrenome] = useState<string | null>(null);
  const [periodo, setPeriodo] = useState<number | null>(null);
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
          const storedNome = await AsyncStorage.getItem('nome');
          setNome(storedNome);
          const storedSobrenome = await AsyncStorage.getItem('sobrenome');
          setSobrenome(storedSobrenome);
          const periodoString = await AsyncStorage.getItem('periodo');
          if (periodoString !== null) {
            setPeriodo(Number(periodoString));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do AsyncStorage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const login = async (role: UserRole, userEmail: string, nome: string, sobrenome: string, periodo: number) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(userEmail);
    setNome(nome);
    setSobrenome(sobrenome);
    setPeriodo(periodo);

    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userRole', role ?? '');
      await AsyncStorage.setItem('userEmail', userEmail);
      await AsyncStorage.setItem('nome', nome);
      await AsyncStorage.setItem('sobrenome', sobrenome);
      await AsyncStorage.setItem('periodo', periodo.toString());
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage no login:', error);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail(null);
    setNome(null);
    setSobrenome(null);
    setPeriodo(null);

    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('nome');
      await AsyncStorage.removeItem('sobrenome');
      await AsyncStorage.removeItem('periodo');
    } catch (error) {
      console.error('Erro ao remover dados do AsyncStorage no logout:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, userEmail, nome, sobrenome, periodo, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
