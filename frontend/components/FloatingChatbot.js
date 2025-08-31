// components/FloatingChatbot.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.chatWindow}>
          <Text style={styles.chatText}>Hi 👋 How can I help you?</Text>
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
    width: 200,
    height: 150,
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
  chatText: {
    fontSize: 14,
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
