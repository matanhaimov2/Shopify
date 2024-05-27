import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null); // save token from back


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setUserData(decodedToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    }
  }, []);

  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token);
    setUserData(decodedToken);
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, accessToken, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
