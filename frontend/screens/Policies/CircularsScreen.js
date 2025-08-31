import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CircularsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Policies - Circulars</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
});
