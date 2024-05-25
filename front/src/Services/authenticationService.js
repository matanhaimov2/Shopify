import axios from "axios";

// Global Veribales
import { SERVER_URL } from "../Assets/GlobalVeriables";

import { isTokenExpired } from '../Utils/tokenUtils';

import { jwtDecode } from "jwt-decode";








// --- API Functions

const register = async (data) => {
    try {
        // Get post from back from db
        const response = await axios.post(SERVER_URL + "/auth/register", data)
        
        return response.data
    }
    catch (err) {
        return false;
    }
}


const login = async (data) => {
    try {
        // Get post from back from db
        const response = await axios.post(SERVER_URL + "/auth/login", data)
        
        return response.data
    }
    catch (err) {
        return false;
    }
}

const isAuthenticated = () => {  
    const token = localStorage.getItem('accessToken');
    if (!token || isTokenExpired(token)) {
        localStorage.removeItem('accessToken');

        return null;
    } else {
        const user = jwtDecode(token);
        return user;
    }
}


export {
    register,
    login,
    isAuthenticated
}
