import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Biblioteca para gerar o QR Code
import { Ionicons } from '@expo/vector-icons';

const ProfessorProfileScreen: React.FC = () => {
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const handleGenerateQRCode = () => {
    const qrCodeContent = 'PresencaProfessor123';
    setQrCodeData(qrCodeContent);
    setQrCodeVisible(true);

    const date = new Date();
    const formattedDate = `Presença dia ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setCurrentDate(formattedDate);

    Alert.alert('QR Code Gerado', 'QR Code para registro de presença gerado com sucesso!');
  };

  const handleCloseQRCode = () => {
    setQrCodeVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../utils/logocefet.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Portal Controle de Presença</Text>
      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <View style={styles.buttonContent}>
          <Ionicons name="qr-code-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Gerar QR Presença</Text>
        </View>
      </TouchableOpacity>
      {qrCodeVisible && (
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrCodeData} size={200} />
          <Text style={styles.dateText}>{currentDate}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseQRCode}>
            <View style={styles.buttonContent}>
              <Ionicons name="close-circle-outline" size={30} color="white" />
              <Text style={styles.closeButtonText}>Fechar</Text>
            </View>
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
    bottom: 80,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#ff4d4d',
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
