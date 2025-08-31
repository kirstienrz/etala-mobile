import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CircularsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Circulars</Text>
      <Text style={styles.content}>
        Browse official circulars related to Gender and Development.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3e8ff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6d28d9",
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
    color: "#a78bfa",
    textAlign: "center",
  },
});
