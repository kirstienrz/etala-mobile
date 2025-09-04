// screens/SignupScreen.js - Fixed Version
import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView 
} from "react-native";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // TUP ID validation (assuming format: TUPM-XX-XXXX or similar)
    if (!form.tupId.trim()) {
      newErrors.tupId = "TUP ID is required";
    } else if (!/^[A-Z0-9-]+$/.test(form.tupId.toUpperCase())) {
      newErrors.tupId = "Please enter a valid TUP ID format";
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Name validations
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

    // Birthday validation
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

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } 

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    setMessage("");

    setIsLoading(true);

    try {
      const res = await signupUser(form);
      setMessage(res.data.msg);

      Alert.alert(
        "Registration Successful!",
        "Your account has been created successfully. You can now log in with your credentials.",
        [
          {
            text: "Go to Login",
            onPress: () => {
              // Clear form on success
              setForm({
                tupId: "",
                email: "",
                firstName: "",
                lastName: "",
                birthday: "",
                password: "",
              });
              setConfirmPassword("");
              navigation.navigate("Login");
            }
          }
        ]
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
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Fix: Allow taps when keyboard is open
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our Gender & Development community</Text>
          </View>

          <View style={styles.formContainer}>

            {/* TUP ID Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>TUP Student/Employee ID *</Text>
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

            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
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

            {/* Name Fields */}
            <View style={styles.nameRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.label}>First Name *</Text>
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

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>Last Name *</Text>
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

            {/* Birthday Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth *</Text>
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

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password *</Text>
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
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              <Text style={styles.passwordHint}>
                Must be 8+ characters with uppercase, lowercase, and number
              </Text>
            </View>

            {/* Confirm Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password *</Text>
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
                  onSubmitEditing={handleSignup} // Allow enter to submit
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.eyeIcon}>{showConfirmPassword ? "🙈" : "👁️"}</Text>
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            {/* Terms Agreement */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By creating an account, you agree to our Terms of Service and Privacy Policy.
                Your information will be kept confidential and secure.
              </Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.signupButton, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleSignup}
              disabled={isLoading}
              activeOpacity={0.8}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <Text style={styles.signupButtonText}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>

            {/* Error/Success Message */}
            {message ? (
              <View style={[styles.messageContainer, { backgroundColor: message.includes("success") ? "#dcfce7" : "#fef2f2" }]}>
                <Text style={[styles.messageText, { color: message.includes("success") ? "#166534" : "#dc2626" }]}>
                  {message}
                </Text>
              </View>
            ) : null}

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLinkText}>Already have an account? </Text>
              <TouchableOpacity 
                onPress={handleGoToLogin}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
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
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9ff", // Light blue-white
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff", // Light blue-white
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#6b46c1", // Purple
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e7ff", // Light purple
    textAlign: "center",
    fontWeight: "500",
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e1b4b", // Dark blue
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1e1b4b", // Dark blue
    borderWidth: 2,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: "#dc2626", // Red
    backgroundColor: "#fef2f2",
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordContainerError: {
    borderColor: "#dc2626", // Red
    backgroundColor: "#fef2f2",
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: "#1e1b4b", // Dark blue
  },
  eyeButton: {
    padding: 16,
  },
  eyeIcon: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 14,
    color: "#dc2626", // Red
    marginTop: 4,
    marginLeft: 4,
  },
  passwordHint: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
    marginLeft: 4,
  },
  termsContainer: {
    backgroundColor: "#ede9fe", // Light purple
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#6b46c1", // Purple
  },
  termsText: {
    fontSize: 14,
    color: "#1e1b4b", // Dark blue
    textAlign: "center",
    lineHeight: 20,
  },
  signupButton: {
    backgroundColor: "#dc2626", // Red
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#dc2626",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signupButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 16,
  },
  loginLinkText: {
    fontSize: 16,
    color: "#64748b",
  },
  loginLink: {
    fontSize: 16,
    color: "#2563eb", // Blue
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});