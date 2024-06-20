import axios from "axios";

// Global Veribales
import { SERVER_URL } from "../Assets/GlobalVeriables";


// --- API Functions


const sendDataToCart = async (data) => {
    try {
        // Save product details for cart memory in db thorugh backend
        const response = await axios.post(SERVER_URL + '/cart/addToCart', data)

        return response.data
    }
    catch (err) {
        return false;
    }
}


export {
    sendDataToCart
}
