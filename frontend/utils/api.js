// utils/api.js
import axios from "axios";
import { API_BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically (if stored in AsyncStorage)
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Requests
export const signupUser = async (formData) => {
  return await api.post("/api/auth/signup", formData);
};

export const loginUser = async (credentials) => {
  return await api.post("/api/auth/login", credentials);
};

export const getProfile = async () => {
  return await api.get("/api/auth/profile"); // ✅ correct route
};

// 🆕 Chatbot request (Gemini-powered)
export const askChatbot = async (message) => {
  try {
    const response = await api.post("/api/chatbot", { message });
    return response.data; // { reply: "... from Gemini ..." }
  } catch (error) {
    console.error("Chatbot API error:", error);
    throw error;
  }
};

export default api;
