import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { ref, push } from "firebase/database";
import { db } from "../../utils/firebaseConfig";

const AlunoProfileScreen: React.FC = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false); // Evitar múltiplos envios

  async function handleOpenCamera() {
    const { granted } = await requestPermission();
    if (!granted) return Alert.alert("Habilite permissão da câmera");
    setModalIsVisible(true);
    setIsScanning(false); // Resetar o estado ao abrir a câmera
  }

  function handleScanQRCode(qrCodeValue: string) {
    if (isScanning) return; // Evitar múltiplos registros
    setIsScanning(true);

    const alunoPresente = {
      nome: "Aluno Exemplo",
      horario: new Date().toISOString(),
      qrCode: qrCodeValue,
    };

    push(ref(db, "presencas/"), alunoPresente)
      .then(() => Alert.alert("Presença Registrada!", "Sua presença foi confirmada."))
      .catch((error) => console.error(error))
      .finally(() => setModalIsVisible(false)); // Fechar modal após escaneamento
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portal Controle de Presença</Text>

      <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
        <Ionicons name="qr-code-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Escanear QR Presença</Text>
      </TouchableOpacity>

      <Modal visible={modalIsVisible} style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={(e) => handleScanQRCode(e.data)}
        />
        <View style={styles.footer}>
          <Button title="Cancelar" onPress={() => setModalIsVisible(false)} />
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
  