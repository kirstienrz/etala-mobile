// components/FloatingChatbot.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { askChatbot } from "../utils/api"; // ✅ import Gemini API call

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi 👋 How can I help you?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await askChatbot(userMessage.text);
      const botMessage = { sender: "bot", text: res.reply || "Sorry, I couldn’t get that." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Error connecting to chatbot." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.chatWindow}>
          <ScrollView style={styles.messages} contentContainerStyle={{ flexGrow: 1 }}>
            {messages.map((msg, idx) => (
              <Text
                key={idx}
                style={msg.sender === "user" ? styles.userText : styles.botText}
              >
                {msg.text}
              </Text>
            ))}
            {loading && <Text style={styles.botText}>Typing...</Text>}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your question..."
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <Text style={styles.fabText}>{isOpen ? "✖" : "💬"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  chatWindow: {
    width: 260,
    height: 320,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  messages: {
    flex: 1,
    marginBottom: 10,
  },
  userText: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    color: "#fff",
    padding: 6,
    borderRadius: 6,
    marginVertical: 2,
    maxWidth: "80%",
  },
  botText: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    color: "#000",
    padding: 6,
    borderRadius: 6,
    marginVertical: 2,
    maxWidth: "80%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 20,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    fontSize: 24,
    color: "#fff",
  },
});
