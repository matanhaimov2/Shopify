import axios from "axios";

// Global Veribales
import { SERVER_URL } from "../Assets/GlobalVeriables";

// --- API Functions

const register = async (data) => {
    try {
        // Fetch data about user to register
        const response = await axios.post(SERVER_URL + "/auth/register", data)

        return response.data
    }
    catch (err) {
        return false;
    }
}

const login = async (data) => {
    try {
        // Send username and password to see if match in db
        const response = await axios.post(SERVER_URL + "/auth/login", data)

        return response.data
    }
    catch (err) {
        return false;
    }
}

const tokenVerification = async (token) => {
    try {
        // Verify if token is valid
        const response = await axios.post(SERVER_URL + "/auth/verify-token", { token })

        return response.data
    }
    catch (err) {
        return false;
    }
}

const roleVerification = async (token) => {
    try {
        // Verify if user is authorized
        const response = await axios.post(SERVER_URL + "/auth/verify-role", { token })
        
        return response.data
    }
    catch (err) {
        return false;
    }
}


export {
    register,
    login,
    tokenVerification,
    roleVerification
}
