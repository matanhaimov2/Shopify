import axios from "axios";

// Global Veribales
import { SERVER_URL } from "../Assets/GlobalVeriables";


// --- API Functions


const sendDataToCart = async (data) => {
    try {
        // Save product details for cart memory in db through backend
        const response = await axios.post(SERVER_URL + '/cart/addToCart', data)

        return response.data
    }
    catch (err) {
        return false;
    }
}

const setCart = async (data) => {
    try {
        // Save cartInfo details in db through backend
        const response = await axios.post(SERVER_URL + '/cart/setCart', data)

        return response.data
    }
    catch (err) {
        return false;
    }
}

const getDataFromCart = async (user_id) => {
    try {
        // Get cartInfo of user from db
        const response = await axios.get(`${SERVER_URL}/cart/getFromCart`, { params: { user_id } })
        
        return response.data
    }
    catch (err) {
        return false;
    }
}

const verifyPrices = async (data) => {
    try {
        // Get cartInfo of user from db
        const response = await axios.get(`${SERVER_URL}/cart/verifyPrices`, { params: data })
        
        return response.data
    }
    catch (err) {
        return false;
    }
}

export {
    sendDataToCart,
    setCart,
    getDataFromCart,
    verifyPrices
}
