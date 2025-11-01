// api.js - SIMPLIFIED VERSION
import axios from "axios";

export const BASE_URL = "https://backend-production-9172b.up.railway.app";
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

export const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    return PLACEHOLDER_IMAGE;
  }

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  if (imagePath.startsWith('/media/img/')) {
    const fixedPath = imagePath.replace('/media/img/', '/static/img/');
    return `${BASE_URL}${fixedPath}`;
  }

  if (imagePath.startsWith('/')) {
    return `${BASE_URL}${imagePath}`;
  }

  return PLACEHOLDER_IMAGE;
};

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

// Only attach token, no refresh logic here
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;