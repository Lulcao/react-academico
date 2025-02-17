import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

const AlunoProfileScreen: React.FC = () => {

  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  async function handleOpenCamera(){
    try {
      const {granted} = await requestPermission()

      if(!granted){
        return Alert.alert("Habilite permissão da câmera")
      }

      setModalIsVisible(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      {/* Logo da faculdade */}
      <Image
        source={require('../../utils/logocefet.png')} // Caminho da imagem da logo
        style={styles.logo}
      />
      <Text style={styles.title}>Portal Controle de Presença</Text>



      {/* Botão de escanear QR code */}
      <TouchableOpacity style={styles.button} onPress={() => console.log('Escanear QR Code')}>
        <Ionicons name="qr-code-outline" size={24} color="white" />
        <Button title='Escanear QR Presença' onPress={handleOpenCamera}/>

        <Modal visible={modalIsVisible} style={{ flex: 1 }} >
          <CameraView style={{ flex: 1 }} facing='back' />
            <View style={styles.footer}>
              <Button title='Cancelar' onPress={() => setModalIsVisible(false)} />
            </View>
        </Modal>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  footer: {
      position: 'absolute',
      bottom: 32, 
      left: 32,
      right:32
  },
  logo: {
    width: 200, // Ajuste de acordo com o tamanho da sua logo
    height: 100,
    resizeMode: 'contain',
    marginBottom: 40, // Espaço entre a logo e o título
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50', // Cor mais séria e profissional
    textAlign: 'center',
    fontFamily: 'Roboto', // Fonte mais acadêmica
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff', // Azul corporativo
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    fontFamily: 'Arial', // Fonte mais moderna e acadêmica
  },
});

export default AlunoProfileScreen;
