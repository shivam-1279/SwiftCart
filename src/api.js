import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

// Only auth interceptor - NO image processing
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// NO response interceptor - let components handle images
export default api;