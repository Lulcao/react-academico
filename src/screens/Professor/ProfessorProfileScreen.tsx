import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Biblioteca para gerar o QR Code
import { Ionicons } from '@expo/vector-icons';

const ProfessorProfileScreen: React.FC = () => {
  const [qrCodeVisible, setQrCodeVisible] = useState(false); // Estado para controlar a visibilidade do QR Code
  const [qrCodeData, setQrCodeData] = useState(''); // Dados do QR Code
  const [currentDate, setCurrentDate] = useState(''); // Estado para armazenar a data

  // Função para gerar QR Code
  const handleGenerateQRCode = () => {
    const qrCodeContent = 'PresencaProfessor123'; // Um valor único para o professor (pode ser dinâmico)
    setQrCodeData(qrCodeContent); // Atribuindo o valor ao estado
    setQrCodeVisible(true); // Tornando o QR Code visível

    // Pegando a data atual no formato desejado
    const date = new Date();
    const formattedDate = `Presença dia ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setCurrentDate(formattedDate); // Armazenando a data formatada

    Alert.alert('QR Code Gerado', 'QR Code para registro de presença gerado com sucesso!');
  };

  // Função para fechar e esconder o QR Code
  const handleCloseQRCode = () => {
    setQrCodeVisible(false); // Ocultando o QR Code
  };

  return (
    <View style={styles.container}>
      {/* Logo da faculdade */}
      <Image 
        source={require('../../utils/logocefet.png')} 
        style={styles.logo}
      />

      <Text style={styles.title}>Portal Controle de Presença</Text>

      {/* Botão de gerar QR Code */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Ionicons name="qr-code-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Gerar QR Presença</Text>
      </TouchableOpacity>

      {/* Exibe o QR Code quando qrCodeVisible for true */}
      {qrCodeVisible && (
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrCodeData} size={200} /> {/* Gerando o QR Code com o valor atribuído */}
          <Text style={styles.dateText}>{currentDate}</Text> {/* Exibindo a data abaixo do QR Code */}

          {/* Botão para fechar o QR Code */}
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseQRCode}>
            <Ionicons name="close-circle-outline" size={30} color="white" />
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}
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
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
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
    fontFamily: 'Arial',
  },
  qrCodeContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  dateText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4d4d', // Cor vermelha para o botão de fechar
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfessorProfileScreen;
