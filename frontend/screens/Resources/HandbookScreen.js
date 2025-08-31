import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HandbookScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resources - Handbook</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
});
