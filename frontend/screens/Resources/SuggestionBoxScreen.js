import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SuggestionBoxScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggestion Box (Anonymous)</Text>
      <Text style={styles.content}>
        Share your thoughts and suggestions to help us improve!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3e8ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6d28d9",
    marginBottom: 16,
    textAlign: "center",
  },
  content: { fontSize: 16, color: "#a78bfa", textAlign: "center" },
});
