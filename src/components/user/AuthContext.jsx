import React, { createContext, useState, useEffect } from "react";
import api from "../../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      fetchUserProfile();
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("user_items/");
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to fetch user profile');
      logout();
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        logout();
        return null;
      }

      const res = await api.post("token/refresh/", { refresh });
      localStorage.setItem("access", res.data.access);
      return res.data.access;
    } catch (error) {
      logout();
      return null;
    }
  };

  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    setIsLoggedIn(true);
    fetchUserProfile();
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
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
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};