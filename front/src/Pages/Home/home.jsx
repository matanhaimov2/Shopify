import React, { useState, useEffect } from 'react';

// CSS
import './home.css';

// React Icons
import { FaComputer } from "react-icons/fa6";

// Services
import { fetchProducts } from '../../Services/productsService'

// Components
import Footer from '../../Components/Footer/footer';

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
                <div className='home-category-wrapper'>
                    <h2>Our Selection</h2>

                    <span className='home-underline'></span>

                    <div className='home-category-selection-wrapper'>
                        <div className='home-category-icon-wrapper'>
                            <FaComputer className='home-category-icon' />
                        </div>

                        <span className='home-category-text-wrapper'>Electronics</span>
                    </div>
                </div>

                <div className='home-products-wrapper'>
                    {products && products.map((product, i) => (
                        <div className='home-each-product-wrapper' key={i}>
                            <span>{product.category}</span>

                            <img className='home-products-image' src={product.image}></img>

                            <span>{product.price}</span>

                        </div>
                    ))}
                </div>
            </section>

            <Footer />

        </div>

    );
}

export default Home;