import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { jwtDecode } from "jwt-decode";

const RouteChangeHandler = () => {
  const { userData, accessToken, handleLogout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      // If token expired - logout
      if (decodedToken.exp * 1000 < Date.now()) {
        handleLogout();
      }
      else if (token !== accessToken) {
        // if token doesnt match with accessToken(Original)
        handleLogout()

      }
    }
    else (
      // if there is no token in localstorage
      handleLogout()
    )

  }, [location, userData, handleLogout, navigate]);

  return null;

  
};

export default RouteChangeHandler;
