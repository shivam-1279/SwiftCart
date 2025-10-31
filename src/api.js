import axios from "axios";
import { jwtDecode } from "jwt-decode";

// ✅ Use environment variable if available, else fallback to localhost
export const BASE_URL =
  import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ Automatically attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiryDate = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (expiryDate > currentTime) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.warn("Access token expired");
        }
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;