import axios from "axios";

// Global Veribales
import { SERVER_URL, IMAGE_BB_key } from "../Assets/GlobalVeriables";



// --- API Functions


const fetchProducts = async (data) => {
    try {
        // Get post from back from db
        const response = await axios.get('https://fakestoreapi.com/products?limit=10')
        // const response = await axios.post(SERVER_URL + "/fetchProducts")
        
        return response.data
    }
    catch (err) {
        return false;
    }
}

const sendProductsToImgbb = async (data) => {
    try {
        const response = await axios.post('https://api.imgbb.com/1/upload?key=' + IMAGE_BB_key, data)
        return response.data
    }
    catch (err) {
        return false;
    }
}

const handleProductsPost = async (data) => {
    try {
        // Save product details in db thorugh backend
        const response = await axios.post(SERVER_URL + '/products/uploadProduct', data)
        console.log(response)
        return response.data
    }
    catch (err) {
        return false;
    }
}

export {
    fetchProducts,
    sendProductsToImgbb,
    handleProductsPost
}
