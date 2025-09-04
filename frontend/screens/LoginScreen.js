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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

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
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUser(form);

      if (res.data.token) {
        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
        Alert.alert(
          "Welcome Back!", 
          `Hello ${res.data.user.firstName}! You're successfully logged in.`,
          [
            {
              text: "Continue",
              style: "default",
            }
          ]
        );
        // Navigate to main app or dashboard
        // navigation.replace("Dashboard");
      } else {
        Alert.alert(
          "Login Failed", 
          res.data.message || "Invalid credentials. Please check your email and password.",
          [
            {
              text: "Try Again",
              style: "cancel",
            }
          ]
        );
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Unable to connect to server. Please check your internet connection.";
      Alert.alert(
        "Login Error", 
        errorMessage,
        [
          {
            text: "OK",
            style: "cancel",
          }
        ]
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
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send Reset Link",
          onPress: () => {
            // navigation.navigate("ForgotPassword");
            Alert.alert("Feature Coming Soon", "Password reset functionality will be available soon.");
          }
        }
      ]
    );
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Fix: Allow taps when keyboard is open
        >
          <View style={styles.container}>
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
                  returnKeyType="next" // Better UX
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
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
                    returnKeyType="done" // Better UX
                    onSubmitEditing={handleLogin} // Allow enter to submit
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase touch area
                  >
                    <Text style={styles.passwordToggleText}>
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity 
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase touch area
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton, 
                  loading && styles.loginButtonDisabled
                ]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} // Increase touch area
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: height * 0.9,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 32,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "400",
  },
  formContainer: {
    flex: 1,
    paddingTop: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "400",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "400",
  },
  passwordToggle: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  passwordToggleText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    paddingHorizontal: 16,
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  signupContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  signupPrompt: {
    color: "#6B7280",
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "400",
  },
  signupButton: {
    borderWidth: 2,
    borderColor: "#3B82F6",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    minWidth: 200,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  footerText: {
    color: "#9CA3AF",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});