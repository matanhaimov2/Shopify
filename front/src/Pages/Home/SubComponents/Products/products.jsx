import React, { useState, useEffect, useContext } from 'react';

// CSS
import './products.css';

// React MUI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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


    // Global States
    const { userData } = useContext(AuthContext);

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
            console.log(response.results)
            setProducts(response.results)

        }

        MarketProducts();
    }, [currentPage])

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOptions = (i) => {
        setIsOptions(!isOptions)
        setCurrentOption(i)
    }

    return (
        <div className='products-wrapper'>
            <div className='products-box'>

                {products && products.map((product, i) => (
                    <div className='each-product-wrapper' key={i}>

                        {isVerified && (
                            <div className='products-options-wrapper'>
                                <IoIosOptions className='options-icon' onClick={() => handleOptions(i)} />
                            
                            {isVerified && isOptions && currentOption===i && (
                                <div className='products-options-component-wrapper'>
                                    <Options token={token} productInfo={product} setIsOptions={setIsOptions} isOptions={isOptions}/>
                                </div>
                            )}
                            </div>
                        )}

                        {product.images.length >= 1 ? (
                            <img className='products-image' alt={`img-${i}`} src={product.images[0]} />
                        ) : (
                            <img className='products-image' alt={`img-${i}`} src={noProductImg}></img>
                        )}

                        <span>{product.title}</span>

                        <span>{product.price}</span>

                        <span>{product.shippingFee}</span>

                    </div>
                ))}
            </div>

            {/* <Stack spacing={1}>
            <Skeleton animation="wave" variant="rectangular" width={200} height={100} />
            <Skeleton animation="wave" variant="rounded" width={200} height={40} />
             </Stack> */}

            <div className='products-pagination-wrapper'>
                <Stack spacing={2}>
                    <Pagination count={10} page={currentPage} onChange={handlePageChange} />
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