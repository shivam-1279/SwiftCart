// api.js - CORRECTED VERSION
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

// Add placeholder image data URI
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

// **FIXED: Simple and correct image URL construction**
export const getImageUrl = (imagePath) => {
  console.log('Original image path:', imagePath);
  
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    console.log('No image path provided, using placeholder');
    return PLACEHOLDER_IMAGE;
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    console.log('Already full URL:', imagePath);
    return imagePath;
  }
  
  // **FIX: Check if it's already a complete path from API**
  // If API returns "/static/img/headphone.avif", just prepend BASE_URL
  if (imagePath.startsWith('/')) {
    const fullUrl = `${BASE_URL}${imagePath}`;
    console.log('Constructed full URL:', fullUrl);
    return fullUrl;
  }
  
  // Fallback: just prepend BASE_URL
  const fallbackUrl = `${BASE_URL}/${imagePath}`;
  console.log('Fallback URL:', fallbackUrl);
  return fallbackUrl;
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