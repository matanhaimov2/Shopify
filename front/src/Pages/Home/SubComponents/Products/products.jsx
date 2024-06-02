import React, { useState, useEffect, useContext } from 'react';

// CSS
import './products.css';

// React MUI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

// Services
import { fetchProducts } from '../../../../Services/productsService';
import { roleVerification } from '../../../../Services/authenticationService';

// Components
import { AuthContext } from "../../../../Components/AuthContext";


function Products({ token }) {

    // States
    const [products, setProducts] = useState();
    const [isVerified, setIsVerified] = useState(false); // role by defualt is false

    // Global States
    const { userData } = useContext(AuthContext);

    // Get products from DB
    useEffect(() => {
        const MarketProducts = async () => {

            let data = {
                category: 'ALL' // category here
            }

            let response = await fetchProducts(data)
            setProducts(response)

        }

        MarketProducts();
    }, [])

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

    return (
        <div className='products-wrapper'>
            <div className='products-box'>

                {products && products.map((product, i) => (
                    <div className='each-product-wrapper' key={i}>

                        <img className='products-image' src={product.image}></img>

                        <span>{product.category}</span>

                        <span>{product.price}</span>

                    </div>
                ))}
            </div>
            {/* <Stack spacing={1}>
            <Skeleton animation="wave" variant="rectangular" width={200} height={100} />
            <Skeleton animation="wave" variant="rounded" width={200} height={40} />
             </Stack> */}

            <div className='products-pagination-wrapper'>
                <Stack spacing={2}>
                    <Pagination count={10} />
                </Stack>

            </div>

        </div>
    );
}

export default Products;