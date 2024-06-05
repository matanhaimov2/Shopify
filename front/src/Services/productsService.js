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
        console.log(response)
        return response.data
    }
    catch (err) {
        return false;
    }
}

const handleProductUpdate = async (data) => {
    try {
        // Save changes of product details in db thorugh backend
        console.log(data)

        // 1. defualt data need to be saved here if no one change 

        // const response = await axios.post(SERVER_URL + '/products/updateProduct', data)
        // console.log(response)
        // return response.data
    }
    catch (err) {
        return false;
    }
}

const fetchProducts = async (data, page) => {
    try {
        // Get products from back from db
        const response = await axios.get(`${SERVER_URL}/products/getProducts?page=${page}&limit=10`, data)

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
    fetchProducts
}
