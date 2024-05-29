import React, { useState, useEffect, useContext } from 'react';

// CSS
import './home.css';

// React MUI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// Services
import { fetchProducts } from '../../Services/productsService'

// Components
import { AuthContext } from "../../Components/AuthContext";

// Sub Components
import Categories from './SubComponents/Categories/categories'


function Home() {

    // States
    const [products, setProducts] = useState();

    const { userData } = useContext(AuthContext);

    // Get products from DB
    useEffect(() => {
        const MarketProducts = async () => {

            let data = {
                category: 'ALL' // category here
            }

            let response = await fetchProducts(data)
            setProducts(response)
            console.log(userData)

            // console.log(response)

        }

        MarketProducts();
    }, [])

    return (
        <div className='home-wrapper'>
            <section className='home-main-section'>
                {userData && (
                    <span>{userData.username}</span>
                )}
                <Categories />

                <div className='home-products-wrapper'>
                    <div className='home-products-box'>

                        {products && products.map((product, i) => (
                            <div className='home-each-product-wrapper' key={i}>

                                <img className='home-products-image' src={product.image}></img>

                                <span>{product.category}</span>

                                <span>{product.price}</span>

                            </div>
                        ))}
                    </div>
                    {/* <Stack spacing={1}>
                        <Skeleton animation="wave" variant="rectangular" width={200} height={100} />
                        <Skeleton animation="wave" variant="rounded" width={200} height={40} />
                    </Stack> */}

                    <div className='home-products-pagination-wrapper'>
                        <Stack spacing={2}>
                            <Pagination count={10} />
                        </Stack>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default Home;