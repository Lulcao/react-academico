import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ref, push, onValue } from "firebase/database";
import { db } from "../utils/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { KeyboardAvoidingView } from "react-native";

const ChatScreen: React.FC = () => {
  const { userEmail } = useAuth();
  const [messages, setMessages] = useState<{ id: string; text: string; sender: string }[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const chatRef = ref(db, "chat/");
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMessages = Object.keys(data).map((key) => ({
          id: key,
          text: data[key].text,
          sender: data[key].sender,
        }));
        setMessages(formattedMessages);
      }
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    
    push(ref(db, "chat/"), {
      text: message,
      sender: userEmail,
    });

    setMessage("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === userEmail ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.sender}>{item.sender}</Text>
          </View>
        )}
      />
<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
</KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ecf0f1",
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#27ae60",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#3498db",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  sender: {
    fontSize: 12,
    color: "#bdc3c7",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#2c3e50",
    padding: 10,
    borderRadius: 8,
  },
});

export default ChatScreen;
