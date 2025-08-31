import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GADCommitteeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAD Committee</Text>
      <Text style={styles.content}>
        Our Gender and Development Committee leads our advocacy and programs.
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
