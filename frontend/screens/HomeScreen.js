import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Gender & Development</Text>
      <Text style={styles.subtitle}>Empowering Equality</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3e8ff" },
  title: { fontSize: 28, fontWeight: "bold", color: "#6d28d9", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "#a78bfa", marginBottom: 30 },
  button: {
    backgroundColor: "#a78bfa",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    shadowColor: "#6d28d9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
