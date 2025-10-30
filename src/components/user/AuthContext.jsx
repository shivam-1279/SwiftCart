import React, { createContext, useState, useEffect } from "react";
import api from "../../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      // Verify token is still valid by fetching user data
      fetchUserProfile();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("user_items/");
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      // Token might be expired, try to refresh
      await refreshToken();
    }
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        logout();
        return;
      }

      const res = await api.post("token/refresh/", { refresh });
      localStorage.setItem("access", res.data.access);
      await fetchUserProfile();
    } catch (error) {
      logout();
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
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};