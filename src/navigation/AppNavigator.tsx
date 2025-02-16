// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfessorProfileScreen from '../screens/Professor/ProfessorProfileScreen';
import AlunoProfileScreen from '../screens/Aluno/AlunoProfileScreen';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
  ProfessorProfileScreen: undefined;
  AlunoProfileScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={userRole === 'aluno' ? 'AlunoProfileScreen' : 'ProfessorProfileScreen'}
    >
      <Stack.Screen 
        name="ProfessorProfileScreen" 
        component={ProfessorProfileScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AlunoProfileScreen" 
        component={AlunoProfileScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
