import React, { useState, useEffect } from 'react';

// CSS
import './home.css';

// React Icons
import { FaComputer } from "react-icons/fa6";

function Home() {

    // States
    const [products, setProducts] = useState();


    useEffect(() => {
        const MarketProducts = async () => {

            fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                const res = json; // Assign the fetched data to a variable
                console.log(res);
                setProducts(res)
                // Log the fetched data to verify
                // Now you can proceed with using `res` as an array
                // For example, you can render your component here with the fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        
        }

        MarketProducts();
    }, [])




    return (
        <div className='home-wrapper'>
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
                {products.map((product, i) => (
                    <div key={i}>
                        <span>{product.category}</span>

                        <img className='home-products-image' src={product.image}></img>

                        <span>{product.price}</span>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;