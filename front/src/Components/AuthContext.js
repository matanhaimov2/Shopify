import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUserData(decodedToken);
        } else {
          handleLogout();
        }
      } catch (error) {
        handleLogout();
      }
    }
  }, []);
  const handleLogin = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    setUserData(decodedToken);
    localStorage.setItem('accessToken', accessToken);
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
