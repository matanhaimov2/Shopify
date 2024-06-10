import axios from "axios";

// Global Veribales
import { SERVER_URL, IMAGE_BB_key } from "../Assets/GlobalVeriables";


// --- API Functions


const sendProductsToImgbb = async (data) => {
    try {
        // Save product images in imgbb
        const response = await axios.post('https://api.imgbb.com/1/upload?key=' + IMAGE_BB_key, data)
        return response.data
    }
    catch (err) {
        return false;
    }
}

const handleProductUpload = async (data) => {
    try {
        // Save product details in db thorugh backend
        const response = await axios.post(SERVER_URL + '/products/uploadProduct', data)

        return response.data
    }
    catch (err) {
        return false;
    }
}

const handleProductUpdate = async (data) => {
    try {
        // Save any updates that happen on products
        const response = await axios.post(SERVER_URL + '/products/updateProduct', data)

        return response.data
    }
    catch (err) {
        return false;
    }
}

const handleProductDeletion = async (product_id) => {
    try {
        // Delete selected product
        const response = await axios.post(SERVER_URL + '/products/deleteProduct', { product_id })

        return response.data
    }
    catch (err) {
        return false;
    }
}

const fetchProducts = async (data, page) => {
    try {
        // Get products from db
        const response = await axios.get(`${SERVER_URL}/products/getProducts?page=${page}&limit=8`, data)

        return response.data
    }
    catch (err) {
        return false;
    }
}

const fetchSpecificProduct = async (product_id) => {
    try {
        // Get specific product from db
        const response = await axios.get(`${SERVER_URL}/products/getSpecificProduct`, { params: { product_id } });
        
        return response.data
    }
    catch (err) {
        return false;
    }
}


export {
    sendProductsToImgbb,
    handleProductUpload,
    handleProductUpdate,
    handleProductDeletion,
    fetchProducts,
    fetchSpecificProduct
}
