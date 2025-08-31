// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
      <Text style={styles.title}>Login Page</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(v) => handleChange("email", v)}
        placeholderTextColor="#a78bfa"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={(v) => handleChange("password", v)}
        placeholderTextColor="#a78bfa"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupText}>Sign Up Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f3e8ff", // light purple
  },
  input: {
    borderWidth: 1,
    borderColor: "#a78bfa", // medium purple
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#6d28d9", // dark purple text
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#6d28d9", // dark purple
    letterSpacing: 1,
  },
  button: {
    backgroundColor: "#a78bfa", // medium purple
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#6d28d9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  signupButton: {
    backgroundColor: "#f3e8ff", // lighter purple
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a78bfa",
  },
  signupText: {
    color: "#6d28d9",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
