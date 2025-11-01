// api.js - EXACT FIX
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

// Add placeholder image data URI
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

// **EXACT FIX: Handle the malformed URLs from your API**
export const getImageUrl = (imagePath) => {
  console.log('🔍 getImageUrl called with:', imagePath);
  
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    console.log('❌ No image path, using placeholder');
    return PLACEHOLDER_IMAGE;
  }
  
  // **FIX: Your API is returning full URLs but they're malformed**
  // They look like: "https://backend-production-9172b.up.railway.app/static/media/img/mous.avif"
  // But they should be: "/static/img/mous.avif" or just "mous.avif"
  
  // If it's already a full URL (starts with http), return it as-is
  if (imagePath.startsWith('http')) {
    console.log('✅ Already full URL, returning as-is:', imagePath);
    return imagePath;
  }
  
  // If it starts with /static/ or /media/, prepend BASE_URL
  if (imagePath.startsWith('/static/') || imagePath.startsWith('/media/')) {
    const finalUrl = `${BASE_URL}${imagePath}`;
    console.log('🔄 Prepend BASE_URL to path:', imagePath, '→', finalUrl);
    return finalUrl;
  }
  
  // If it's just a filename, assume it's in static/img
  if (!imagePath.includes('/')) {
    const finalUrl = `${BASE_URL}/static/img/${imagePath}`;
    console.log('🔄 Using filename in static/img:', imagePath, '→', finalUrl);
    return finalUrl;
  }
  
  // Fallback: just prepend BASE_URL
  const finalUrl = `${BASE_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
  console.log('🔄 Fallback conversion:', imagePath, '→', finalUrl);
  return finalUrl;
};

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

// Add request logging to debug the cart stats 400 error
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} to: ${config.url}`);
    console.log('Params:', config.params);
    
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} from: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ ${error.response?.status} from: ${error.config?.url}`);
    console.error('Error details:', error.response?.data);
    return Promise.reject(error);
  }
);

export default api;