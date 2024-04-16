import axios from "axios";

// Global Veribales
import { SERVER_URL } from "../Assets/GlobalVeriables";



// --- API Functions


const fetchProducts = async (data) => {
    try {
        // Get post from back from db
        const response = await axios.get('https://fakestoreapi.com/products?limit=9')
        // const response = await axios.post(SERVER_URL + "/fetchProducts")
        
        return response.data
    }
    catch (err) {
        return false;
    }
}



export {
    fetchProducts
}
