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

// ✅ FIXED: Response interceptor with proper image URL handling
api.interceptors.response.use(
  (response) => {
    // Only process if we have data
    if (response.data && typeof response.data === 'object') {
      const processData = (data) => {
        if (Array.isArray(data)) {
          return data.map(item => processData(item));
        } else if (data && typeof data === 'object') {
          const processed = { ...data };
          
          for (const key in processed) {
            if (processed.hasOwnProperty(key)) {
              // Handle image fields
              if (key === 'image' && typeof processed[key] === 'string') {
                const imageUrl = processed[key];
                
                // Only fix if it's a relative path starting with /media/ or /static/
                if (imageUrl && imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
                  // Remove any duplicate base URLs that might have been added
                  let cleanUrl = imageUrl;
                  if (imageUrl.includes(BASE_URL)) {
                    cleanUrl = imageUrl.replace(BASE_URL, '');
                  }
                  
                  // Construct proper URL
                  processed[key] = `${BASE_URL}${cleanUrl}`;
                }
              } else if (typeof processed[key] === 'object') {
                processed[key] = processData(processed[key]);
              }
            }
          }
          return processed;
        }
        return data;
      };

      response.data = processData(response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;