import axios from "axios";
import { jwtDecode } from "jwt-decode";

// ✅ Use environment variable if available, else fallback to localhost
export const BASE_URL =
  import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

// ✅ FIX: Ensure BASE_URL doesn't have trailing slash and handle media paths
const cleanBaseUrl = BASE_URL.replace(/\/$/, '');

// ✅ Override the exported BASE_URL to handle images automatically
let _baseUrl = cleanBaseUrl;

// ✅ Proxy the BASE_URL export to fix image paths
export { _baseUrl as BASE_URL };

const api = axios.create({
  baseURL: cleanBaseUrl,
});

// ✅ Response interceptor to fix image URLs in API responses
api.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object') {
      const fixImageUrls = (obj) => {
        if (obj && typeof obj === 'object') {
          if (Array.isArray(obj)) {
            obj.forEach(fixImageUrls);
          } else {
            for (let key in obj) {
              if (key === 'image' && obj[key] && typeof obj[key] === 'string') {
                // Fix the image URL
                if (!obj[key].startsWith('http')) {
                  if (obj[key].startsWith('/img/')) {
                    obj[key] = `${cleanBaseUrl}/media${obj[key]}`;
                  } else if (obj[key].startsWith('/media/')) {
                    obj[key] = `${cleanBaseUrl}${obj[key]}`;
                  } else {
                    obj[key] = `${cleanBaseUrl}/media/img/${obj[key]}`;
                  }
                }
              } else if (typeof obj[key] === 'object') {
                fixImageUrls(obj[key]);
              }
            }
          }
        }
      };
      fixImageUrls(response.data);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

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