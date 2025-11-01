import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

// Add placeholder image data URI
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

// **FIXED: Proper image URL construction**
export const getImageUrl = (imagePath) => {
  console.log('Original image path:', imagePath); // Debug log
  
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    return PLACEHOLDER_IMAGE;
  }
  
  // If it's already a full URL (starts with http), return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it starts with double slash or malformed, fix it
  if (imagePath.includes('https//') || imagePath.includes('http//')) {
    // Fix malformed URLs
    const fixedPath = imagePath.replace('https//', 'https://').replace('http//', 'http://');
    return fixedPath;
  }
  
  // If it starts with /static/, it's from the backend static files
  if (imagePath.startsWith('/static/')) {
    return `${BASE_URL}${imagePath}`;
  }
  
  // If it doesn't start with /, add it
  if (!imagePath.startsWith('/')) {
    return `${BASE_URL}/${imagePath}`;
  }
  
  // Default case
  return `${BASE_URL}${imagePath}`;
};

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

// Auth interceptor - ONLY add token if it exists
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

// Response interceptor - don't auto-redirect on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Authentication required for this endpoint');
      // Don't clear tokens or redirect - let components handle this
    }
    return Promise.reject(error);
  }
);

export default api;