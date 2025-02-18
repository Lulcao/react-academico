import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfessorProfileScreen from '../screens/Professor/ProfessorProfileScreen';
import AlunoProfileScreen from '../screens/Aluno/AlunoProfileScreen';
import ChangeData from '../screens/Aluno/ChangeData';
import LoginScreen from '../screens/Auth/LoginScreen';
import { useAuth } from '../context/AuthContext';
import ChatScreen from '../screens/ChatScreen';

export type RootStackParamList = {
  ProfessorProfileScreen: undefined;
  AlunoProfileScreen: undefined;
  ChangeData: undefined;
  LoginScreen: undefined;
  ChatScreen:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={
        userRole === 'aluno' ? 'AlunoProfileScreen' : 'ProfessorProfileScreen'
      }
    >
      <Stack.Screen 
        name="ProfessorProfileScreen" 
        component={ProfessorProfileScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AlunoProfileScreen" 
        component={AlunoProfileScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ChatScreen" 
        component={ChatScreen} 
        />
        <Stack.Screen 
        name="ChangeData" 
        component={ChangeData} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
