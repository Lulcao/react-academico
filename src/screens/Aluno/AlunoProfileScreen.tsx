import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AlunoProfileScreen = () => {
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout } = useAuth();

  const handleEditarDados = () => {
    navigation.navigate('ChangeData');
  };

  const handleTurmasAssociado = () => {
    navigation.navigate('AlunoQRCode');
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    logout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Aluno</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleEditarDados}>
        <Text style={styles.buttonText}>Visualizar Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleTurmasAssociado}>
        <Text style={styles.buttonText}>Turmas Associado</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f7fc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2c3e50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10, // Espaço acima e abaixo de cada botão
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AlunoProfileScreen;
