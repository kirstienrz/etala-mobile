import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Y2023Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Programs & Projects - 2023</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
});
