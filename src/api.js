import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

// Request interceptor for auth tokens
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

// Response interceptor - FIXED image URL handling
api.interceptors.response.use(
  (response) => {
    // Fix image URLs safely
    if (response.data && typeof response.data === 'object') {
      const fixImageUrls = (obj) => {
        if (Array.isArray(obj)) {
          return obj.map(item => fixImageUrls(item));
        } else if (obj && typeof obj === 'object') {
          const newObj = { ...obj };
          for (let key in newObj) {
            if (newObj.hasOwnProperty(key)) {
              if (key === 'image' && typeof newObj[key] === 'string') {
                // Fix image URL - only if it's a relative path
                const imageUrl = newObj[key];
                if (imageUrl && !imageUrl.startsWith('http') && imageUrl.startsWith('/')) {
                  newObj[key] = `${BASE_URL}${imageUrl}`;
                }
              } else if (typeof newObj[key] === 'object') {
                newObj[key] = fixImageUrls(newObj[key]);
              }
            }
          }
          return newObj;
        }
        return obj;
      };
      
      response.data = fixImageUrls(response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;