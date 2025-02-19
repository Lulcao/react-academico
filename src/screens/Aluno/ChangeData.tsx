import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useAuth } from '../../context/AuthContext';


const ChangeData = () => {
  const user = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

  const handleSalvarSenha = () => {
    if (novaSenha === confirmarNovaSenha) {
      // Aqui você pode chamar sua API ou lógica para alterar a senha
      console.log('Senha alterada com sucesso!');
      // Fechar modal e resetar campos
      setModalVisible(false);
      setNovaSenha('');
      setConfirmarNovaSenha('');
    } else {
      console.log('As senhas não coincidem.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados do Usuário</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome de Usuário:</Text>
        <Text style={styles.readOnlyField}>{user.username}</Text>
        </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.readOnlyField}>{user.nome}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Sobrenome:</Text>
        <Text style={styles.readOnlyField}>{user.sobrenome}</Text>
      </View>
      {user.userRole == 'aluno' &&(
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>Período Atual:</Text>
            <Text style={styles.readOnlyField}>{user.periodo}</Text>
        </View>
        )}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      {/* Modal para alteração de senha */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Alterar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Nova Senha"
              secureTextEntry
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Nova Senha"
              secureTextEntry
              value={confirmarNovaSenha}
              onChangeText={setConfirmarNovaSenha}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={handleSalvarSenha}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f7fc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
  },
  readOnlyField: {
    fontSize: 16,
    color: '#555',
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2c3e50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2c3e50',
  },
  modalButtons: {
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#c0392b',
    marginTop: 10,
  },
});

export default ChangeData;
