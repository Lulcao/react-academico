import React, { useState, useCallback, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { ref, push } from "firebase/database";
import { db } from "../../utils/firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const AlunoProfileScreen: React.FC = () => {
  const { userEmail } = useAuth();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const lastScanRef = useRef<number>(0);
  const SCAN_COOLDOWN = 3000; // 3 seconds cooldown between scans

  async function handleOpenCamera() {
    const { granted } = await requestPermission();
    if (!granted) return Alert.alert("Habilite permissão da câmera");
    setModalIsVisible(true);
    setIsScanning(false);
    lastScanRef.current = 0;
  }

  const handleScanQRCode = useCallback((qrCodeValue: string) => {
    const now = Date.now();
    
    // Check if we're already scanning or if we're within the cooldown period
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
        Alert.alert("Presença Registrada!", "Sua presença foi confirmada.");
        // Close modal after successful scan
        setModalIsVisible(false);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Erro", "Não foi possível registrar a presença. Tente novamente.");
      })
      .finally(() => {
        // Reset scanning state after a short delay
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
    <View style={styles.container}>
      <Text style={styles.title}>Portal Controle de Presença</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleOpenCamera}
        disabled={isScanning}
      >
        <Ionicons name="qr-code-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Escanear QR Presença</Text>
      </TouchableOpacity>

      <Modal visible={modalIsVisible} style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={isScanning ? undefined : (e) => handleScanQRCode(e.data)}
        />
        <View style={styles.footer}>
          <Button title="Cancelar" onPress={handleCloseCamera} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20, color: "#2c3e50" },
  button: { flexDirection: "row", alignItems: "center", backgroundColor: "#007bff", padding: 14, borderRadius: 12 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 12 },
  footer: { position: "absolute", bottom: 32, left: 32, right: 32 },
});

export default AlunoProfileScreen;