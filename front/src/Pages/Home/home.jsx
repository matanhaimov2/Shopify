import React, { useState, useEffect } from 'react';

// CSS
import './home.css';

// React MUI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


// Services
import { fetchProducts } from '../../Services/productsService'

// Components
import Footer from '../../Components/Footer/footer';

// Sub Components
import Categories from './SubComponents/Categories/categories'

function Home() {

    // States
    const [products, setProducts] = useState();


    useEffect(() => {
        const MarketProducts = async () => {

            let data = {
                category: 'ALL' // category here
            }

            let response = await fetchProducts(data)
            setProducts(response)

            console.log(response)

        }

        MarketProducts();
    }, [])




    return (
        <div className='home-wrapper'>
            <section className='home-main-section'>

                <Categories />

                <div className='home-products-wrapper'>
                    <div className='home-products-box'>
                        {products && products.map((product, i) => (
                            <div className='home-each-product-wrapper' key={i}>
                                <span>{product.category}</span>

                                <img className='home-products-image' src={product.image}></img>

                                <span>{product.price}</span>

                            </div>
                        ))}
                    </div>

                    <div className='home-products-pagination-wrapper'>
                        <Stack spacing={2}>
                            <Pagination count={10} />
                        </Stack>
                    </div>

                </div>
            </section>

            <Footer />

        </div>

    );
}

export default Home;