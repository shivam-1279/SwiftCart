// api.js - ENHANCED VERSION
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

// Add placeholder image data URI
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

// **ENHANCED: Handle all possible image path cases**
export const getImageUrl = (imagePath) => {
  console.log('🔍 getImageUrl called with:', imagePath);
  
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    console.log('❌ No image path provided, using placeholder');
    return PLACEHOLDER_IMAGE;
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    console.log('✅ Already full URL:', imagePath);
    return imagePath;
  }
  
  // Handle different path formats
  let finalUrl;
  
  if (imagePath.startsWith('/static/')) {
    finalUrl = `${BASE_URL}${imagePath}`;
    console.log('🔄 Converted static path:', imagePath, '→', finalUrl);
  }
  else if (imagePath.startsWith('/media/')) {
    // Convert /media/img/filename to /static/img/filename
    const filename = imagePath.split('/').pop();
    finalUrl = `${BASE_URL}/static/img/${filename}`;
    console.log('🔄 Converted media path:', imagePath, '→', finalUrl);
  }
  else if (imagePath.startsWith('img/') || imagePath.startsWith('/img/')) {
    // Handle img/ paths
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    finalUrl = `${BASE_URL}/static${cleanPath}`;
    console.log('🔄 Converted img path:', imagePath, '→', finalUrl);
  }
  else {
    // Default: assume it's a filename in static/img
    finalUrl = `${BASE_URL}/static/img/${imagePath}`;
    console.log('🔄 Default conversion:', imagePath, '→', finalUrl);
  }
  
  console.log('🎯 Final image URL:', finalUrl);
  return finalUrl;
};

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

// Keep the rest of your axios configuration the same
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Authentication required for this endpoint');
    }
    return Promise.reject(error);
  }
);

export default api;