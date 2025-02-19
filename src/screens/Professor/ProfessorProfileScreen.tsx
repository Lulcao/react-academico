import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, SafeAreaView, Platform } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import { ref, onValue, remove, get } from "firebase/database";
import { db } from "../../utils/firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../../context/AuthContext';
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";


const ProfessorProfileScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { logout } = useAuth();
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [presencas, setPresencas] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const TOTAL_ALUNOS = 12;

  const handleLogout = async () => {
    logout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  useEffect(() => {
    const presencaRef = ref(db, "presencas/");
    onValue(presencaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const presencasList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...(value as object)
        }));
        setPresencas(presencasList);
      } else {
        setPresencas([]);
      }
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

  const handleCloseQRCode = () => {
    setQrCodeVisible(false);
    setQrCodeData("");
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);



  const renderPresencaItem = ({ item }: { item: any }) => (
    <View style={styles.presencaItem}>
      <View style={styles.presencaContent}>
        <Ionicons name="person-outline" size={24} color="#2c3e50" style={styles.userIcon} />
        <View style={styles.presencaInfo}>
          <Text style={styles.userName}>{item.nome}</Text>
          <Text style={styles.presencaTime}>
            {new Date(item.horario).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );

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


  const renderAttendanceGraph = () => {
    const presentStudents = new Set(presencas.map(p => p.nome)).size;
    const absentStudents = TOTAL_ALUNOS - presentStudents;

    const data = [
      {
        name: "Presentes",
        population: presentStudents,
        color: "#27ae60",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Ausentes",
        population: absentStudents,
        color: "#e74c3c",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ];
    return (
      <View style={styles.graphContainer}>
        <PieChart
          data={data}
          width={Dimensions.get("window").width - 80}
          height={200}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
        />
        <View style={styles.statisticsContainer}>
          <Text style={styles.statisticsText}>
            Total de Alunos: {TOTAL_ALUNOS}
          </Text>
          <Text style={styles.statisticsText}>
            Presentes: {presentStudents} ({((presentStudents / TOTAL_ALUNOS) * 100).toFixed(1)}%)
          </Text>
          <Text style={styles.statisticsText}>
            Ausentes: {absentStudents} ({((absentStudents / TOTAL_ALUNOS) * 100).toFixed(1)}%)
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Portal de Presença</Text>
        <Text style={styles.subtitle}>Área do Professor</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleGenerateQRCode}
        >
          <Ionicons name="qr-code-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Gerar QR Presença</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.chatButton]}
          onPress={() => navigation.navigate("ChatScreen")}
        >
          <Ionicons name="chatbubbles-outline" size={28} color="white" />
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>



        {qrCodeVisible && (
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCodeWrapper}>
              <QRCode value={qrCodeData} size={200} />
              <TouchableOpacity
                style={styles.closeQRButton}
                onPress={handleCloseQRCode}
              >
                <Ionicons name="close-circle" size={32} color="#e74c3c" />
              </TouchableOpacity>
            </View>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={openModal}
        >
          <Ionicons name="list-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Lista de Presenças</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.graphButton]}
          onPress={() => setIsGraphModalVisible(true)}
        >
          <Ionicons name="bar-chart-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Gráfico de Presenças</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={28} color="white" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Lista de Presenças</Text>
              <Text style={styles.modalSubtitle}>{currentDate}</Text>
            </View>

            <FlatList
              data={presencas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderPresencaItem}
              style={styles.list}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              extraData={presencas} // Força a atualização da lista quando os dados mudam
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.button, styles.dangerButton]}
                onPress={clearPresencas}
              >
                <Ionicons name="trash-outline" size={24} color="white" />
                <Text style={styles.buttonText}>Limpar Lista</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={closeModal}
              >
                <Ionicons name="close-outline" size={24} color="white" />
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isGraphModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Estatísticas de Presença</Text>
              <Text style={styles.modalSubtitle}>{currentDate}</Text>
            </View>

            {renderAttendanceGraph()}

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={() => setIsGraphModalVisible(false)}
              >
                <Ionicons name="close-outline" size={24} color="white" />
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingTop: Platform.OS === "android" ? 40 : 20,
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
  },
  graphButton: {
    backgroundColor: "#9b59b6",
  },
  graphContainer: {
    padding: 20,
    alignItems: 'center',
  },
  statisticsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    width: '100%',
  },
  statisticsText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 8,
    fontWeight: '600',
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 60,
    borderRadius: 12,
    marginVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButton: {
    backgroundColor: "#3498db",
  },
  secondaryButton: {
    backgroundColor: "#2980b9",
  },
  chatButton: {
    backgroundColor: "#27ae60",
  },
  logoutButton: {
    backgroundColor: "#E06666",
    marginTop: 280, // Changed from 340
  },
  dangerButton: {
    backgroundColor: "#e74c3c",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#7f8c8d",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  qrCodeContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  qrCodeWrapper: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "relative",
  },
  closeQRButton: {
    position: "absolute",
    top: -15,
    right: -15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 2,
  },
  dateText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
  },
  modalHeader: {
    backgroundColor: "#2c3e50",
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#bdc3c7",
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 15,
  },
  presencaItem: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  presencaContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    marginRight: 15,
  },
  presencaInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  presencaTime: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  modalFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
  },
});


export default ProfessorProfileScreen;