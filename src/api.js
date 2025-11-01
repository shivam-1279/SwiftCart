// api.js - FIXED VERSION
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

// FIX: Updated request interceptor to use 'access' token instead of 'authToken'
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access'); // Changed from 'authToken' to 'access'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// FIX: Updated response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refresh');
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
            refresh: refreshToken
          });
          
          const newAccessToken = response.data.access;
          localStorage.setItem('access', newAccessToken);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        console.log('Token refresh failed - logging out');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        // Redirect to login page
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;