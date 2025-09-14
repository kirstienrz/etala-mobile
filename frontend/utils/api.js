// utils/api.js
import axios from "axios";
import { API_BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout for file uploads
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to every request
api.interceptors.request.use(async (config) => {
  const storedData = await AsyncStorage.getItem("userData");
  if (storedData) {
    const { token } = JSON.parse(storedData);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token attached to request");
    }
  } else {
    console.log("❌ No token found in AsyncStorage");
  }
  return config;
});

// ✅ Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Response Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      code: error.code,
    });
    return Promise.reject(error);
  }
);

// ---------- Auth ----------
export const signupUser = async (formData) => {
  return await api.post("/api/auth/signup", formData);
};

export const loginUser = async (credentials) => {
  return await api.post("/api/auth/login", credentials);
};

export const getProfile = async () => {
  return await api.get("/api/auth/profile");
};

// ---------- Update Profile - FIXED VERSION ----------
export const updateProfile = async (formData) => {
  try {
    const storedData = await AsyncStorage.getItem("userData");
    if (!storedData) throw new Error("No stored user data found");
    
    const { token } = JSON.parse(storedData);
    if (!token) throw new Error("No authentication token found");

    // console.log("🔹 Starting profile update...");
    // console.log("🔹 API Base URL:", API_BASE_URL);
    
    // // ✅ Log FormData contents for debugging
    // console.log("🔹 FormData parts:", formData._parts?.length || 0);
    // formData._parts?.forEach((part, index) => {
    //   if (part[0] === 'avatar') {
    //     console.log(`🔹 Part ${index}: ${part[0]} = [File Object - ${part[1]?.name || 'unnamed'}]`);
    //   } else {
    //     console.log(`🔹 Part ${index}: ${part[0]} = ${part[1]}`);
    //   }
    // });

    // ✅ Create a new axios instance specifically for this upload
    const uploadApi = axios.create({
      baseURL: API_BASE_URL,
      timeout: 60000, // 60 seconds for file upload
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      // ✅ Important: Remove content-length limit for file uploads
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    const response = await uploadApi.put("/api/auth/profile/update", formData);
    
    return response;
  } catch (error) {
    console.error("❌ Update profile error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      code: error.code,
      url: error.config?.url,
      method: error.config?.method,
    });
    
    // ✅ More specific error handling
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. The file might be too large or connection is slow.');
    } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      throw new Error('Network connection failed. Please check your internet connection and server status.');
    } else if (error.response?.status === 413) {
      throw new Error('File too large. Please choose a smaller image.');
    } else if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please login again.');
    } else if (error.response?.status === 400) {
      throw new Error(error.response?.data?.msg || 'Invalid data provided.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    throw error;
  }
};

// ---------- Update Password ----------
export const updatePassword = async (currentPassword, newPassword) => {
  return await api.put("/api/auth/profile/update-password", {
    currentPassword,
    newPassword,
  });
};

// ---------- Chatbot ----------
export const askChatbot = async (message) => {
  try {
    const response = await api.post("/api/chatbot", { message });
    return response.data;
  } catch (error) {
    console.error("Chatbot API error:", error);
    throw error;
  }
};

export default api;