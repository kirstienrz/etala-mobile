// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../utils/api";

export default function LoginScreen() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUser(form);

      if (res.data.token) {
        await AsyncStorage.setItem("token", res.data.token);
        Alert.alert("Success", `Welcome ${res.data.user.firstName}!`);

      } else {
        Alert.alert("Login Failed", res.data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(v) => handleChange("email", v)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={(v) => handleChange("password", v)}
      />
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
