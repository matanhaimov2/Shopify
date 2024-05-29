import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

// Components
import { AuthContext } from './AuthContext';

// Services 
import { tokenVerification } from '../Services/authenticationService'


const RouteChangeHandler = () => {
  const { accessToken, handleLogout } = useContext(AuthContext);
  const location = useLocation();

  const verifyToken = async (token) => {
    const data = await tokenVerification(token);
    return data;
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          handleLogout();
        }
        else {
          // if token isn't verified (meanning someone touched the token in LS)
          verifyToken(token).then(data => {
            if (!data) {
              handleLogout();
            }
          });
        }
      } catch (error) {
        handleLogout();
      }
    }
    else {
      handleLogout();
    }
  }, [location, accessToken, handleLogout]);

  return null;
};

export default RouteChangeHandler;
