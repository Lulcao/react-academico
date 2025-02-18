import React, { useState, useCallback, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, SafeAreaView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { ref, push } from "firebase/database";
import { db } from "../../utils/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";

const AlunoProfileScreen: React.FC = () => {
  const { userEmail } = useAuth();
  const { logout } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const lastScanRef = useRef<number>(0);
  const SCAN_COOLDOWN = 3000;
  
  const handleLogout = async () => {
    logout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });  };

  async function handleOpenCamera() {
    const { granted } = await requestPermission();
    if (!granted) return Alert.alert("Permissão Necessária", "Habilite a permissão da câmera para continuar");
    setModalIsVisible(true);
    setIsScanning(false);
    lastScanRef.current = 0;
  }

  const handleScanQRCode = useCallback((qrCodeValue: string) => {
    const now = Date.now();

    if (isScanning || (now - lastScanRef.current) < SCAN_COOLDOWN) {
      return;
    }

    setIsScanning(true);
    lastScanRef.current = now;

    const alunoPresente = {
      nome: userEmail,
      horario: new Date().toISOString(),
      qrCode: qrCodeValue,
    };

    push(ref(db, "presencas/"), alunoPresente)
      .then(() => {
        Alert.alert(
          "Presença Confirmada!",
          "Sua presença foi registrada com sucesso.",
          [{ text: "OK", onPress: () => setModalIsVisible(false) }]
        );
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Erro no Registro",
          "Não foi possível registrar sua presença. Tente novamente."
        );
      })
      .finally(() => {
        setTimeout(() => {
          setIsScanning(false);
        }, SCAN_COOLDOWN);
      });
  }, [userEmail, isScanning]);

  const handleCloseCamera = useCallback(() => {
    setModalIsVisible(false);
    setIsScanning(false);
    lastScanRef.current = 0;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Portal de Presença</Text>
        <Text style={styles.subtitle}>Área do Aluno</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={80} color="#2c3e50" />
          </View>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <Text style={styles.userType}>Aluno</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.scanButton, isScanning && styles.buttonDisabled]}
          onPress={handleOpenCamera}
          disabled={isScanning}
        >
          <Ionicons name="qr-code-outline" size={28} color="white" />
          <Text style={styles.buttonText}>Escanear QR Presença</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.chatButton]}
          onPress={() => navigation.navigate("ChatScreen")}
        >
          <Ionicons name="chatbubbles-outline" size={28} color="white" />
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]} 
          onPress={handleLogout}>
        <Ionicons name= "exit-outline" size={28} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </View>

      <Modal visible={modalIsVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.cameraHeader}>
            <Text style={styles.cameraTitle}>Escaneie o QR Code</Text>
            <Text style={styles.cameraSubtitle}>Posicione o código no centro da tela</Text>
          </View>

          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={isScanning ? undefined : (e) => handleScanQRCode(e.data)}
          />

          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={handleCloseCamera}
          >
            <Ionicons name="close-circle-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Fechar Câmera</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2c3e50",
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#bdc3c7",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 40,
  },
  userInfo: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20
  },
  avatarContainer: {
    position: 'absolute',
    zIndex: 10,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userEmail: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    paddingTop: 150,
    marginBottom: 5,
  },
  userType: {
    fontSize: 16,
    paddingTop: 10,
    color: "#7f8c8d",
  },
  button: {
    marginTop: 80,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    width: '90%',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scanButton: {
    backgroundColor: "#3498db",
    bottom: 30
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    position: 'absolute',
    bottom: 40,
    left: '5%',
    right: '5%',
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  cameraHeader: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  cameraTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  cameraSubtitle: {
    fontSize: 14,
    color: "#bdc3c7",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  chatButton: {
    backgroundColor: "#27ae60",
    marginTop: -2,
  },
  logoutButton: {
    backgroundColor: '#E06666',
    alignItems: 'center',
    marginTop: 95,

  }
});

export default AlunoProfileScreen;