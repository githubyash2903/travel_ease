// src/api/axios.ts
import axios from "axios";

// ========================
// Base Config
// ========================
const BASE_URL = "http://localhost:4000/api/v1";

// ========================
// Public Client
// ========================
export const publicClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// ========================
// Auth Client
// ========================
export const authClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// ========================
// Attach Token Automatically
// ========================
authClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // take from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========================
// Auto Logout on 401
// ========================
authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // remove token → logout
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // optional redirect
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);
