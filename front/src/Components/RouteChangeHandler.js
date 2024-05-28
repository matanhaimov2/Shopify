import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

// Components
import { AuthContext } from './AuthContext';


const RouteChangeHandler = () => {
  const { userData, accessToken, handleLogout } = useContext(AuthContext);
  const location = useLocation();
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      // If token expired
      if (decodedToken.exp * 1000 < Date.now()) {
        handleLogout();
      }
      else if (accessToken && token !== accessToken) { // --- Problem when refreshing after changing manually the token in LS
        // if token doesnt match with accessToken(original)
        handleLogout()
      }
    }
    else (
      // if there is no token in localstorage
      handleLogout()
    )

  }, [location, userData, handleLogout]);

  return null;
  
};

export default RouteChangeHandler;
