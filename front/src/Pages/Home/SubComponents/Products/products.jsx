import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

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

// Components
import { AuthContext } from '../../../../Components/AuthContext';

// Sub Components
import Options from './SubComponents/options';


function Products({ token }) {

    // States
    const [products, setProducts] = useState();
    const [isVerified, setIsVerified] = useState(false); // role by defualt is false
    const [currentPage, setCurrentPage] = useState(1); // page by default is 1
    const [isOptions, setIsOptions] = useState(false);
    const [currentOption, setCurrentOption] = useState();
    const [pages, setPages] = useState();

    const { searchQuery, setSearchQuery, currentCategory } = useContext(AuthContext);

    // Navigation Handle
    const navigate = useNavigate();

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
                category: currentCategory // category here
            }

            let response = await fetchProducts(data, currentPage, searchQuery)

            setProducts(response.results.results)
            setPages(response.totalAmount ? Math.ceil(response.totalAmount / 8) : 1);
        }

        MarketProducts();

    }, [currentPage, searchQuery, currentCategory])


    // Change page number
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOptions = (i) => {
        setIsOptions(!isOptions)
        setCurrentOption(i)
    }

    // navigate to specificProduct with its id
    const displaySpecificProduct = (product_id) => {
        setSearchQuery('')
        navigate(`/product/${product_id}`)
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

                            <div className='products-image-wrapper' onClick={() => displaySpecificProduct(product._id)}>
                                {product.images.length >= 1 ? (
                                    <img className='products-image' alt={`img-${i}`} src={product.images[0]} />
                                ) : (
                                    <img className='products-image' alt={`img-${i}`} src={noProductImg}></img>
                                )}
                            </div>

                            <div className='products-bottom-wrapper'>
                                <span>{product.title}</span>

                                <span>{product.price}₪</span>

                                {product.shippingFee === 0 ? (
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
                    <Pagination count={pages} page={currentPage} onChange={(handlePageChange)} />
                </Stack>

            </div>

        </div>
    );
}

export default Products;