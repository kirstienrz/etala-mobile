// screens/SignupScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signupUser } from "../utils/api";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    tupId: "",
    email: "",
    firstName: "",
    lastName: "",
    birthday: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const res = await signupUser(form);
      setMessage(res.data.msg);

      // clear fields on success
      setForm({
        tupId: "",
        email: "",
        firstName: "",
        lastName: "",
        birthday: "",
        password: "",
      });
    navigation.navigate("Login"); // 👈 redirect to Login after sign up

    } catch (err) {
      setMessage(err.response?.data?.msg || "Error");
    }
  };

  return (
    <View>
      <TextInput placeholder="TUP ID" value={form.tupId} onChangeText={(tupId) => setForm({ ...form, tupId })} />
      <TextInput placeholder="Email" value={form.email} onChangeText={(email) => setForm({ ...form, email })} />
      <TextInput placeholder="First Name" value={form.firstName} onChangeText={(firstName) => setForm({ ...form, firstName })} />
      <TextInput placeholder="Last Name" value={form.lastName} onChangeText={(lastName) => setForm({ ...form, lastName })} />
      <TextInput placeholder="Birthday (YYYY-MM-DD)" value={form.birthday} onChangeText={(birthday) => setForm({ ...form, birthday })} />
      <TextInput placeholder="Password" secureTextEntry value={form.password} onChangeText={(password) => setForm({ ...form, password })} />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text>{message}</Text>
    </View>
  );
}
