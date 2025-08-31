import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ContactUsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.content}>
        For inquiries, reach us at: genderdev@example.com
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e8ff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6d28d9",
    marginBottom: 16,
    textAlign: "center",
  },
  content: {
    fontSize: 18,
    color: "#a78bfa",
    textAlign: "center",
  },
});
