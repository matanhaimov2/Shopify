import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


// CSS
import './specificProduct.css';


// Services
import { fetchSpecificProduct } from '../../Services/productsService';

function SpecificProduct() {

    // States
    const [product, setProduct] = useState()

    // useParams - get id from URL
    let { id } = useParams()

    useEffect(() => {
        const getProductInfo = async () => {

            let response = await fetchSpecificProduct(id)
            console.log(response)
            setProduct(response)

        }

        getProductInfo();
    }, [])


    return (
        <div className='specificProduct-wrapper'>
            <span>sasdsa</span>
        </div>
    );
}

export default SpecificProduct;

// for product route when all images needs to be displayed
// {product.images.length >= 1 ? (
//     product.images.map((img, index) => (
//         <img key={index} className='products-image' src={img} alt={`Product Image ${index + 1}`}
//         />
//     ))
// ) : (
//     <img className='products-image' src={noProductImg}></img>
// )}