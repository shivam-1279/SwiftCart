import axios from "axios";
import { jwtDecode } from "jwt-decode";

// ✅ Use environment variable if available, else fallback to localhost
export const BASE_URL =
  import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ Automatically attach token to every request
// In your api.js - Add this response interceptor
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
                // Fix the image URL in response
                if (!obj[key].startsWith('http') && obj[key].includes('/img/')) {
                  obj[key] = `${BASE_URL}/static${obj[key]}`;
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