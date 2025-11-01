// api.js - UPDATED VERSION
import axios from "axios";

export const BASE_URL = "https://backend-production-9172b.up.railway.app";
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

export const getImageUrl = (imagePath) => {
  console.log('🖼️ Original image path:', imagePath);
  
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    return PLACEHOLDER_IMAGE;
  }

  // If it's already a complete URL, use it
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // FIX: Replace /media/img/ with /static/img/
  if (imagePath.startsWith('/media/img/')) {
    const fixedPath = imagePath.replace('/media/img/', '/static/img/');
    const finalUrl = `${BASE_URL}${fixedPath}`;
    console.log('✅ Fixed URL:', finalUrl);
    return finalUrl;
  }

  // For any other path starting with /
  if (imagePath.startsWith('/')) {
    return `${BASE_URL}${imagePath}`;
  }

  return PLACEHOLDER_IMAGE;
};

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      console.log('Authentication error - redirecting to login');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // You might want to redirect to login page here
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;