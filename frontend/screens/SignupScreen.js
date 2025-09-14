// screens/SignupScreen.js - Improved Layout
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signupUser } from "../utils/api";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({ tupId: "", email: "", firstName: "", lastName: "", birthday: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.tupId.trim()) {
      newErrors.tupId = "TUP ID is required";
    } else if (!/^[A-Z0-9-]+$/.test(form.tupId.toUpperCase())) {
      newErrors.tupId = "Please enter a valid TUP ID format";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (form.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (form.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!form.birthday.trim()) {
      newErrors.birthday = "Birthday is required";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.birthday)) {
      newErrors.birthday = "Please use YYYY-MM-DD format";
    } else {
      const birthDate = new Date(form.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (isNaN(birthDate.getTime())) {
        newErrors.birthday = "Please enter a valid date";
      } else if (age < 16 || age > 100) {
        newErrors.birthday = "Age must be between 16 and 100 years";
      }
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } 

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    setMessage("");
    setIsLoading(true);

    try {
      const res = await signupUser(form);
      setMessage(res.data.msg);

      Alert.alert(
        "Registration Successful!",
        "Your account has been created successfully. You can now log in with your credentials.",
        [{
          text: "Go to Login",
          onPress: () => {
            setForm({ tupId: "", email: "", firstName: "", lastName: "", birthday: "", password: "" });
            setConfirmPassword("");
            navigation.navigate("Login");
          }
        }]
      );
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Registration failed. Please try again.";
      setMessage(errorMessage);
      Alert.alert("Registration Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our Gender & Development community</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>TUP Student/Employee ID</Text>
              <TextInput
                style={[styles.input, errors.tupId && styles.inputError]}
                placeholder="Enter your TUP ID (e.g., TUPM-20-1234)"
                value={form.tupId}
                onChangeText={(tupId) => {
                  setForm({ ...form, tupId: tupId.toUpperCase() });
                  if (errors.tupId) setErrors({ ...errors, tupId: null });
                }}
                autoCapitalize="characters"
                placeholderTextColor="#94a3b8"
                returnKeyType="next"
              />
              {errors.tupId && <Text style={styles.errorText}>{errors.tupId}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Enter your email address"
                value={form.email}
                onChangeText={(email) => {
                  setForm({ ...form, email });
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#94a3b8"
                returnKeyType="next"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.nameRow}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={[styles.input, errors.firstName && styles.inputError]}
                  placeholder="First Name"
                  value={form.firstName}
                  onChangeText={(firstName) => {
                    setForm({ ...form, firstName });
                    if (errors.firstName) setErrors({ ...errors, firstName: null });
                  }}
                  autoCapitalize="words"
                  placeholderTextColor="#94a3b8"
                  returnKeyType="next"
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
              </View>

              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={[styles.input, errors.lastName && styles.inputError]}
                  placeholder="Last Name"
                  value={form.lastName}
                  onChangeText={(lastName) => {
                    setForm({ ...form, lastName });
                    if (errors.lastName) setErrors({ ...errors, lastName: null });
                  }}
                  autoCapitalize="words"
                  placeholderTextColor="#94a3b8"
                  returnKeyType="next"
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={[styles.input, errors.birthday && styles.inputError]}
                placeholder="YYYY-MM-DD (e.g., 1995-06-15)"
                value={form.birthday}
                onChangeText={(birthday) => {
                  setForm({ ...form, birthday });
                  if (errors.birthday) setErrors({ ...errors, birthday: null });
                }}
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
                returnKeyType="next"
              />
              {errors.birthday && <Text style={styles.errorText}>{errors.birthday}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.passwordContainer, errors.password && styles.passwordContainerError]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter a strong password"
                  value={form.password}
                  onChangeText={(password) => {
                    setForm({ ...form, password });
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#94a3b8"
                  returnKeyType="next"
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.eyeIcon}>{showPassword ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={[styles.passwordContainer, errors.confirmPassword && styles.passwordContainerError]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={(confirmPassword) => {
                    setConfirmPassword(confirmPassword);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                  }}
                  secureTextEntry={!showConfirmPassword}
                  placeholderTextColor="#94a3b8"
                  returnKeyType="done"
                  onSubmitEditing={handleSignup}
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Text style={styles.eyeIcon}>{showConfirmPassword ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            <TouchableOpacity style={[styles.signupButton, { opacity: isLoading ? 0.7 : 1 }]} onPress={handleSignup} disabled={isLoading}>
              <Text style={styles.signupButtonText}>{isLoading ? "Creating Account..." : "Create Account"}</Text>
            </TouchableOpacity>

            {message ? (
              <View style={[styles.messageContainer, { backgroundColor: message.includes("success") ? "#dcfce7" : "#fef2f2" }]}>
                <Text style={[styles.messageText, { color: message.includes("success") ? "#166534" : "#dc2626" }]}>{message}</Text>
              </View>
            ) : null}

            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLinkText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleGoToLogin}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f9ff" },
  container: { flex: 1, backgroundColor: "#f8f9ff" },
  scrollContainer: { flexGrow: 1, paddingVertical: 20 },
  header: { backgroundColor: "#6b46c1", paddingTop: 40, paddingHorizontal: 20, paddingBottom: 25, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#ffffff", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 15, color: "#e0e7ff", textAlign: "center", fontWeight: "500" },
  formContainer: { paddingHorizontal: 20 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 15, fontWeight: "600", color: "#1e1b4b", marginBottom: 6 },
  input: { backgroundColor: "#ffffff", borderRadius: 10, padding: 14, fontSize: 15, color: "#1e1b4b", borderWidth: 1.5, borderColor: "#e2e8f0", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  inputError: { borderColor: "#dc2626", backgroundColor: "#fef2f2" },
  nameRow: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { flex: 1, marginHorizontal: 6 },
  passwordContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 10, borderWidth: 1.5, borderColor: "#e2e8f0", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  passwordContainerError: { borderColor: "#dc2626", backgroundColor: "#fef2f2" },
  passwordInput: { flex: 1, padding: 14, fontSize: 15, color: "#1e1b4b" },
  eyeButton: { padding: 14 },
  eyeIcon: { fontSize: 14, color: "#6b46c1", fontWeight: "600" },
  errorText: { fontSize: 13, color: "#dc2626", marginTop: 3, marginLeft: 4 },
  signupButton: { backgroundColor: "#dc2626", paddingVertical: 15, paddingHorizontal: 24, borderRadius: 10, marginTop: 10, marginBottom: 16, shadowColor: "#dc2626", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  signupButtonText: { color: "#ffffff", fontSize: 17, fontWeight: "bold", textAlign: "center" },
  messageContainer: { padding: 10, borderRadius: 8, marginBottom: 12, borderWidth: 1 },
  messageText: { fontSize: 13, textAlign: "center", fontWeight: "500" },
  loginLinkContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, paddingBottom: 50 },
  loginLinkText: { fontSize: 15, color: "#64748b" },
  loginLink: { fontSize: 15, color: "#2563eb", fontWeight: "bold", textDecorationLine: "underline" },
});