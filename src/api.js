// api.js - FIXED VERSION
import axios from "axios";

export const BASE_URL = "https://backend-production-9172b.up.railway.app";
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

// FIXED IMAGE URL FUNCTION
export const getImageUrl = (imagePath) => {
  if (!imagePath) return PLACEHOLDER_IMAGE;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // FIX: Simply change /media/ to /static/
  if (imagePath.startsWith('/media/')) {
    return `${BASE_URL}${imagePath.replace('/media/', '/static/')}`;
  }
  
  // If path starts with / but not /media/, use as is
  if (imagePath.startsWith('/')) {
    return `${BASE_URL}${imagePath}`;
  }
  
  return PLACEHOLDER_IMAGE;
};
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

export default api;