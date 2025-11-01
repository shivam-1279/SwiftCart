// api.js - FIXED VERSION
import axios from "axios";

export const BASE_URL = "https://backend-production-9172b.up.railway.app";
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

export const getImageUrl = (imagePath) => {
  console.log('🖼️ Processing image path:', imagePath);
  
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    return PLACEHOLDER_IMAGE;
  }

  // If it's already a complete URL, use it
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Try multiple possible locations
  const attempts = [
    `${BASE_URL}${imagePath}`, // Original path from API
    `${BASE_URL}/static${imagePath}`, // With /static added
    `${BASE_URL}/static/img/${imagePath.split('/').pop()}`, // Just filename in static/img
    `${BASE_URL}/media${imagePath}`, // With /media added
    `${BASE_URL}/media/img/${imagePath.split('/').pop()}`, // Just filename in media/img
  ];

  // Test each URL
  for (let attempt of attempts) {
    console.log('🔍 Testing URL:', attempt);
  }

  // Return the most likely one
  return attempts[0];
};
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

export default api;