import React, { useState, useEffect } from 'react';

// CSS
import './products.css';

// React MUI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// React Icons
import { IoIosOptions } from "react-icons/io";

// Images
import noProductImg from '../../../../Assets/Images/no-product-img.jpg'

// Services
import { fetchProducts } from '../../../../Services/productsService';
import { roleVerification } from '../../../../Services/authenticationService';

// Sub Components
import Options from './SubComponents/options';


function Products({ token }) {

    // States
    const [products, setProducts] = useState();
    const [isVerified, setIsVerified] = useState(false); // role by defualt is false
    const [currentPage, setCurrentPage] = useState(1); // page by default is 1
    const [isOptions, setIsOptions] = useState(false);
    const [currentOption, setCurrentOption] = useState();

    // Role Verification
    useEffect(() => {
        const verifyRole = async () => {
            try {
                const data = await roleVerification(token);
                if (data) {
                    setIsVerified(true);
                }
                else {
                    setIsVerified(false);
                }
            } catch (error) {
                console.error('Role verification failed', error);
                setIsVerified(false);
            }
        };

        verifyRole();
    }, [token, isVerified]);

    // Get products from DB
    useEffect(() => {
        const MarketProducts = async () => {

            let data = {
                category: 'ALL' // category here
            }

            let response = await fetchProducts(data, currentPage)
            // console.log(response.results)
            setProducts(response.results)

        }

        MarketProducts();
    }, [currentPage])

    // Change page number
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOptions = (i) => {
        setIsOptions(!isOptions)
        setCurrentOption(i)
    }

    // Handle amount of skeleton in a page
    const skeletons = Array.from({ length: 8 });

    return (
        <div className='products-wrapper'>
            {products ? (
                <div className='products-box'>

                    {products && products.map((product, i) => (
                        <div className='each-product-wrapper' key={i}>
                            {isVerified && (
                                <div className='products-options-wrapper'>
                                    <IoIosOptions className='products-options-icon' onClick={() => handleOptions(i)} />

                                    {isVerified && isOptions && currentOption === i && (
                                        <div className='products-options-component-wrapper'>
                                            <Options token={token} productInfo={product} setIsOptions={setIsOptions} isOptions={isOptions} />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className='products-image-wrapper'>
                                {product.images.length >= 1 ? (
                                    <img className='products-image' alt={`img-${i}`} src={product.images[0]} />
                                ) : (
                                    <img className='products-image' alt={`img-${i}`} src={noProductImg}></img>
                                )}
                            </div>

                            <div className='products-bottom-wrapper'>
                                <span>{product.title}</span>

                                <span>{product.price}₪</span>

                                {product.shippingFee===0 ? (
                                    <span>Free Shipping</span>
                                ) : (
                                    <span>+Shipping: {product.shippingFee}₪</span>
                                )}
                            </div>
                            
                        </div>
                    ))}
                </div>
            ) : (
                <div className='skeletons-wrapper'>
                    {skeletons.map((_, index) => (
                        <Stack spacing={1} key={index}>
                            <Skeleton animation="wave" variant="rectangular" width={300} height={200} />
                            <Skeleton animation="wave" variant="rounded" width={300} height={20} />
                            <Skeleton animation="wave" variant="rounded" width={300} height={20} />
                            <Skeleton animation="wave" variant="rounded" width={300} height={20} />
                        </Stack>
                    ))}
                </div>
            )}

            <div className='products-pagination-wrapper'>
                <Stack spacing={2}>
                    <Pagination count={10} page={currentPage} onChange={(handlePageChange)} />
                </Stack>

            </div>

        </div>
    );
}

export default Products;

// for product route when all images needs to be displayed
// {product.images.length >= 1 ? (
//     product.images.map((img, index) => (
//         <img key={index} className='products-image' src={img} alt={`Product Image ${index + 1}`}
//         />
//     ))
// ) : (
//     <img className='products-image' src={noProductImg}></img>
// )}