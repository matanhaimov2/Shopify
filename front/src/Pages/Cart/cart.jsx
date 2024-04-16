import React, { useState, useEffect } from 'react';

// CSS
import './cart.css';

// Components
import Footer from '../../Components/Footer/footer'

function Cart() {


    return (
        <div className='cart-wrapper'>
            <section className='cart-sub-wrapper'>
                <div className='cart-contents-wrapper'>
                    <h1>Cart</h1>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Cart;