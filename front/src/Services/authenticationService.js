import axios from "axios";

// Global Veribales
import { SERVER_URL } from "../Assets/GlobalVeriables";

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

export {
    register,
    login
}
