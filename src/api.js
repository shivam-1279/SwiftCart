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

// ✅ ULTRA-SIMPLE: Only fix image URLs in the exact format you need
api.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object') {
      const fixImages = (obj) => {
        if (Array.isArray(obj)) {
          return obj.map(fixImages);
        }
        if (obj && typeof obj === 'object') {
          const newObj = { ...obj };
          if (newObj.image && typeof newObj.image === 'string' && newObj.image.startsWith('/media/')) {
            newObj.image = BASE_URL + newObj.image;
          }
          return newObj;
        }
        return obj;
      };
      
      response.data = fixImages(response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;