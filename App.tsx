import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainApp: React.FC = () => {
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (loggedIn === 'true') {
          const role = await AsyncStorage.getItem('userRole');
          const userEmail = await AsyncStorage.getItem('userEmail');
          const nome = await AsyncStorage.getItem('nome');
          const sobrenome = await AsyncStorage.getItem('sobrenome');
          const periodoString = await AsyncStorage.getItem('periodo');
          if (role && userEmail && nome && sobrenome) {
            const periodo = periodoString ? Number(periodoString) : 0;
            login(role as 'aluno' | 'professor', userEmail, nome, sobrenome, periodo);
          }
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do AsyncStorage:', error);
      }
    };

    checkLoginStatus();
  }, [login]);

  return (
    <NavigationContainer key={isLoggedIn ? 'loggedIn' : 'loggedOut'}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
