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
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser as loginUserAPI } from "../utils/api";
import { loginUser } from "../redux/authSlice";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await loginUserAPI(form);

      if (res.data.token) {
        await dispatch(loginUser({
          user: res.data.user,
          token: res.data.token
        }));

        Alert.alert(
          "Welcome Back!",
          `Hello ${res.data.user.firstName}! You're successfully logged in.`,
          [
            {
              text: "Continue",
              style: "default",
              onPress: () => navigation.navigate("Private")
            }
          ]
        );
      } else {
        Alert.alert(
          "Login Failed",
          res.data.message || "Invalid credentials. Please check your email and password.",
          [{ text: "Try Again", style: "cancel" }]
        );
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Unable to connect to server. Please check your internet connection.";
      Alert.alert(
        "Login Error",
        errorMessage,
        [{ text: "OK", style: "cancel" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Reset Password",
      "Would you like to reset your password? We'll send instructions to your email.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send Reset Link",
          onPress: () => Alert.alert("Feature Coming Soon", "Password reset functionality will be available soon.")
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.spacer} />
            
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoText}>ETALA</Text>
                </View>
              </View>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to your account</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  placeholder="Enter your email"
                  style={[styles.input, errors.email && styles.inputError]}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  value={form.email}
                  onChangeText={(v) => handleChange("email", v)}
                  placeholderTextColor="#9CA3AF"
                  returnKeyType="next"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
                  <TextInput
                    placeholder="Enter your password"
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                    value={form.password}
                    onChangeText={(v) => handleChange("password", v)}
                    placeholderTextColor="#9CA3AF"
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.passwordToggleText}>
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? "Signing In..." : "Sign In"}
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Sign Up Section */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupPrompt}>Don't have an account?</Text>
                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={() => navigation.navigate("Signup")}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signupButtonText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                By signing in, you agree to our Terms of Service and Privacy Policy
              </Text>
            </View>
            
            <View style={styles.spacer} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  keyboardContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', minHeight: height * 0.9 },
  container: { flex: 1, paddingHorizontal: 24, backgroundColor: "#FFFFFF" },
  spacer: { flex: 0.5 },
  header: { alignItems: "center", paddingVertical: 20 },
  logoContainer: { marginBottom: 20 },
  logoCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#8B5CF6", alignItems: "center", justifyContent: "center", shadowColor: "#8B5CF6", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 5 },
  logoText: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  title: { fontSize: 28, fontWeight: "700", color: "#1F2937", marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 15, color: "#6B7280", textAlign: "center", fontWeight: "400" },
  formContainer: { paddingTop: 16 },
  inputContainer: { marginBottom: 18 },
  inputLabel: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: "#E5E7EB", paddingHorizontal: 14, paddingVertical: 12, borderRadius: 10, backgroundColor: "#F9FAFB", fontSize: 15, color: "#1F2937", fontWeight: "400" },
  inputError: { borderColor: "#EF4444", backgroundColor: "#FEF2F2" },
  passwordContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1.5, borderColor: "#E5E7EB", borderRadius: 10, backgroundColor: "#F9FAFB" },
  passwordInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: "#1F2937", fontWeight: "400" },
  passwordToggle: { paddingHorizontal: 14, paddingVertical: 12 },
  passwordToggleText: { color: "#3B82F6", fontSize: 13, fontWeight: "600" },
  errorText: { color: "#EF4444", fontSize: 11, marginTop: 3, fontWeight: "500" },
  forgotPasswordContainer: { alignSelf: "flex-end", marginBottom: 20 },
  forgotPasswordText: { color: "#3B82F6", fontSize: 13, fontWeight: "600" },
  loginButton: { backgroundColor: "#8B5CF6", paddingVertical: 14, borderRadius: 10, alignItems: "center", shadowColor: "#8B5CF6", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 5, marginBottom: 20 },
  loginButtonDisabled: { backgroundColor: "#D1D5DB", shadowOpacity: 0, elevation: 0 },
  loginButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },
  dividerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  dividerText: { paddingHorizontal: 14, color: "#9CA3AF", fontSize: 13, fontWeight: "500" },
  signupContainer: { alignItems: "center", marginBottom: 20 },
  signupPrompt: { color: "#6B7280", fontSize: 15, marginBottom: 10, fontWeight: "400" },
  signupButton: { borderWidth: 1.5, borderColor: "#3B82F6", paddingVertical: 12, paddingHorizontal: 28, borderRadius: 10, backgroundColor: "#FFFFFF", minWidth: 180, alignItems: "center" },
  signupButtonText: { color: "#3B82F6", fontSize: 15, fontWeight: "700", letterSpacing: 0.3 },
  footer: { paddingVertical: 12, alignItems: "center" },
  footerText: { color: "#9CA3AF", fontSize: 11, textAlign: "center", lineHeight: 16, paddingHorizontal: 16 },
});