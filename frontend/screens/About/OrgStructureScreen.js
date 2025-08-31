import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OrgStructureScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us - Organizational Structure</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
});
