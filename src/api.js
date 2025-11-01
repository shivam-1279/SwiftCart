// api.js - FIXED VERSION
import axios from "axios";

export const BASE_URL = "https://backend-production-9172b.up.railway.app";
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

export const getImageUrl = (imagePath) => {
  console.log('Image path received:', imagePath);
  
  if (!imagePath) return PLACEHOLDER_IMAGE;
  
  // If already full URL, return as is
  if (imagePath.includes('http')) return imagePath;
  
  // Remove any leading slashes or media paths
  let cleanPath = imagePath;
  if (cleanPath.startsWith('/media/')) {
    cleanPath = cleanPath.replace('/media/', '');
  }
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }
  
  // Build the correct URL
  const finalUrl = `${BASE_URL}/static/img/${cleanPath}`;
  console.log('Final image URL:', finalUrl);
  
  return finalUrl;
};
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

export default api;