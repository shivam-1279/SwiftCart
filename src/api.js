// api.js - EXACT FIX
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

// Add placeholder image data URI
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

// **EXACT FIX: Handle the actual image paths from your API**
export const getImageUrl = (imagePath) => {
  console.log('🔍 getImageUrl called with:', imagePath);
  
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    console.log('❌ No image path, using placeholder');
    return PLACEHOLDER_IMAGE;
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    console.log('✅ Already full URL');
    return imagePath;
  }
  
  // **FIX: Your API is returning paths like "/media/img/headphone.avif"**
  // But your images are actually at "/static/img/headphone.avif"
  let finalUrl;
  
  if (imagePath.includes('/media/img/')) {
    // Convert "/media/img/filename" to "/static/img/filename"
    const filename = imagePath.split('/').pop();
    finalUrl = `${BASE_URL}/static/img/${filename}`;
    console.log('🔄 Converted media to static:', imagePath, '→', finalUrl);
  }
  else if (imagePath.includes('/static/img/')) {
    // Already correct static path
    finalUrl = `${BASE_URL}${imagePath}`;
    console.log('✅ Using static path:', finalUrl);
  }
  else if (imagePath.startsWith('/')) {
    // Any other path starting with /
    finalUrl = `${BASE_URL}${imagePath}`;
    console.log('🔄 Using path as-is:', finalUrl);
  }
  else {
    // Just a filename
    finalUrl = `${BASE_URL}/static/img/${imagePath}`;
    console.log('🔄 Using filename:', finalUrl);
  }
  
  console.log('🎯 Final URL:', finalUrl);
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
    console.log('Data:', config.data);
    
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