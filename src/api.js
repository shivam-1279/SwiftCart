// api.js - FIXED VERSION
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

// **FIXED: Proper image URL handling**
export const getImageUrl = (imagePath) => {
  console.log('🔍 getImageUrl called with:', imagePath);

  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    console.log('❌ No image path provided, using placeholder');
    return PLACEHOLDER_IMAGE;
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    console.log('✅ Already full URL:', imagePath);
    return imagePath;
  }

  // Your API returns paths like "/media/img/headphone.avif"
  // But actual images are at "/static/img/headphone.avif"
  // Let's fix the path mapping
  let cleanPath = imagePath;
  
  // Replace /media/ with /static/ if needed
  if (cleanPath.startsWith('/media/')) {
    cleanPath = cleanPath.replace('/media/', '/static/');
    console.log('🔄 Converted media to static path:', cleanPath);
  }
  
  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  const fullUrl = `${BASE_URL}${cleanPath}`;
  console.log('✅ Final image URL:', fullUrl);
  return fullUrl;
};

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.log(`❌ ${error.response?.status} ${error.config?.url}:`, error.message);
    if (error.response?.status === 401) {
      console.log('Authentication required for this endpoint');
    }
    return Promise.reject(error);
  }
);

export default api;