import React, { createContext, useState, useEffect } from "react";
import api from "../../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Token cleanup and validation function
  const validateAndCleanTokens = () => {
    const token = localStorage.getItem('access');
    if (!token) {
      localStorage.removeItem('refresh');
      return false;
    }
    
    // Simple token validation
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      
      if (isExpired) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return false;
      }
      
      return true;
    } catch (error) {
      // If token is invalid, clear everything
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return false;
    }
  };

  useEffect(() => {
    // Validate tokens on app startup
    const hasValidToken = validateAndCleanTokens();
    
    if (hasValidToken) {
      fetchUserProfile();
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  // Add axios response interceptor for token refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const newToken = await refreshToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            logout();
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("user_items/");
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Don't logout immediately, try to refresh token first
      if (error.response?.status === 401) {
        try {
          await refreshToken();
          // Retry fetching user profile after token refresh
          const retryRes = await api.get("user_items/");
          setUser(retryRes.data);
          setIsLoggedIn(true);
        } catch (refreshError) {
          logout();
        }
      } else {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        throw new Error('No refresh token');
      }

      const res = await api.post("token/refresh/", { refresh });
      const newAccessToken = res.data.access;
      localStorage.setItem("access", newAccessToken);
      
      // Update axios default headers
      api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      
      return newAccessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      throw error;
    }
  };

  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    
    // Update axios default headers
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    
    setIsLoggedIn(true);
    fetchUserProfile();
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    delete api.defaults.headers.common['Authorization'];
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      login, 
      logout, 
      refreshToken,
      loading,
      validateAndCleanTokens // Export if needed elsewhere
    }}>
      {children}
    </AuthContext.Provider>
  );
};