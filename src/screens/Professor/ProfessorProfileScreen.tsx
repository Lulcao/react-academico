import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../../utils/firebaseConfig";

const ProfessorProfileScreen: React.FC = () => {
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [presencas, setPresencas] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);  // Estado para controle da modal

  useEffect(() => {
    const presencaRef = ref(db, "presencas/");
    onValue(presencaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setPresencas(Object.values(data));
    });
  }, []);

  const handleGenerateQRCode = () => {
    const qrCodeContent = "PresencaProfessor123";
    setQrCodeData(qrCodeContent);
    setQrCodeVisible(true);

    const date = new Date();
    const formattedDate = `Presença dia ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setCurrentDate(formattedDate);

    Alert.alert("QR Code Gerado", "QR Code para registro de presença gerado com sucesso!");
  };

  // Função para abrir a modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Função para fechar a modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Função para limpar a lista de presença
  const clearPresencas = () => {
    const presencaRef = ref(db, "presencas/");
    remove(presencaRef)
      .then(() => {
        setPresencas([]); // Atualiza o estado local para refletir a remoção
        Alert.alert("Lista limpa", "A lista de presenças foi limpa com sucesso.");
      })
      .catch((error) => {
        Alert.alert("Erro", "Erro ao tentar limpar a lista de presenças.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portal Controle de Presença</Text>

      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Ionicons name="qr-code-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Gerar QR Presença</Text>
      </TouchableOpacity>

      {qrCodeVisible && (
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrCodeData} size={200} />
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
      )}

      {/* Botão para abrir a modal com a lista de presenças */}
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Ionicons name="list-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Exibir Lista de Presenças</Text>
      </TouchableOpacity>

      {/* Modal para exibir a lista de presenças */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.listTitle}>Lista de Presenças</Text>
            <FlatList
              data={presencas}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.presencaItem}>
                  <Text>{item.nome} - {new Date(item.horario).toLocaleString()}</Text>
                </View>
              )}
            />
            <TouchableOpacity style={styles.button} onPress={clearPresencas}>
              <Ionicons name="trash-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Limpar Lista</Text>
            </TouchableOpacity>
            <Button title="Fechar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20, color: "#2c3e50" },
  button: { flexDirection: "row", alignItems: "center", backgroundColor: "#007bff", padding: 14, borderRadius: 12, marginBottom: 10 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 12 },
  qrCodeContainer: { marginTop: 30, alignItems: "center" },
  dateText: { marginTop: 10, fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  listTitle: { fontSize: 24, fontWeight: "bold", marginTop: 20, textAlign: "center" },
  presencaItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },

  // Estilos para a modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semitransparente
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default ProfessorProfileScreen;
