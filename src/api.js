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

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add cart_code to requests that need it
    const cartEndpoints = ['cart', 'get_cart', 'update_quantity', 'Delete_item'];
    const needsCartCode = cartEndpoints.some(endpoint => 
      config.url?.includes(endpoint)
    );
    
    if (needsCartCode) {
      const cart_code = localStorage.getItem("cart_code");
      if (cart_code) {
        if (!config.params) {
          config.params = { cart_code };
        } else {
          config.params.cart_code = cart_code;
        }
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;