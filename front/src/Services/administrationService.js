import axios from "axios";

// Global Veribales
import { SERVER_URL } from "../Assets/GlobalVeriables";



// --- API Functions


const healthCheck = async (data) => {
    try {
        // Get post from back from db
        const response = await axios.post(SERVER_URL + "/healthCheck")
        console.log(response);
        
        return response.data
    }
    catch (err) {
        return false;
    }
}



export {
    healthCheck
}
