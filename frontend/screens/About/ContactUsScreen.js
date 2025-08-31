import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ContactUsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us - Contact Us</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
});
