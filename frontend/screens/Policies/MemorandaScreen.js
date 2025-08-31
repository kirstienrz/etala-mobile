import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MemorandaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memoranda</Text>
      <Text style={styles.content}>
        Access memoranda issued for Gender and Development programs.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3e8ff", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", color: "#6d28d9", marginBottom: 16 },
  content: { fontSize: 18, color: "#a78bfa", textAlign: "center" },
});
