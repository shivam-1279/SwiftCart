// api.js - SIMPLE FIX FOR IMAGES
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-production-9172b.up.railway.app";

export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

// **SIMPLE FIX: Direct image URL construction**
export const getImageUrl = (imagePath) => {
  console.log('🖼️ Original image path:', imagePath);

  if (!imagePath) {
    console.log('❌ No image path, using placeholder');
    return PLACEHOLDER_IMAGE;
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Your images are at: https://backend-production-9172b.up.railway.app/static/img/headphone.avif
  // But API returns: "/media/img/headphone.avif"
  // So we need to fix the path
  
  let fixedPath = imagePath;
  
  // Replace /media/ with /static/
  if (fixedPath.startsWith('/media/')) {
    fixedPath = fixedPath.replace('/media/', '/static/');
  }
  
  // Ensure path starts with /
  if (!fixedPath.startsWith('/')) {
    fixedPath = '/' + fixedPath;
  }

  const finalUrl = `${BASE_URL}${fixedPath}`;
  console.log('✅ Final image URL:', finalUrl);
  return finalUrl;
};

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

export default api;