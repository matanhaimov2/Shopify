import React from 'react';

// CSS
import './quantity.css';

// Services
import { setCart } from '../../Services/cartService';

function Quantity({ quantityValue, setQuantityValue, isCart, userData, product_id, cartInfo, updatePrices }) {

    const increment = async () => {
        const value = parseInt(document.getElementById(`quantity-${product_id}`).innerText);
        const newQuantity = value + 1;

        // changing quantity from cart page
        if (isCart) {
            // if user/admin
            if (userData) {
                let product = cartInfo.filter((product) => product.product_id === product_id)[0];
                let index = cartInfo.indexOf(product);
                const updatedProduct = product.quantityValue = newQuantity

                cartInfo.with(index, updatedProduct);

                let data = {
                    cartInfo: cartInfo,
                    user_id: userData.userId
                }

                // save updated cartInfo in backend
                await setCart(data)
            }
            // if guest
            else {

                let product = cartInfo.filter((product) => product.product_id === product_id)[0];
                let index = cartInfo.indexOf(product);
                const updatedProduct = product.quantityValue = newQuantity

                cartInfo.with(index, updatedProduct);

                localStorage.setItem('cartInfo', JSON.stringify(cartInfo))
            }

            let object = document.getElementById(`quantity-${product_id}`)
            if (object) {
                object.innerHTML = newQuantity;
            }

            // Update price of cart
            updatePrices(cartInfo)
        }
        // changing quantity from specificProduct page
        else {
            setQuantityValue(newQuantity)
        }

    }

    const decrement = async () => {
        const value = parseInt(document.getElementById(`quantity-${product_id}`).innerText);
        const newQuantity = value > 1 ? value - 1 : 1;

        // changing quantity from cart page
        if (isCart) {
            // if user/admin
            if (userData) {
                let product = cartInfo.filter((product) => product.product_id === product_id)[0];
                let index = cartInfo.indexOf(product);
                const updatedProduct = product.quantityValue = newQuantity

                cartInfo.with(index, updatedProduct);

                let data = {
                    cartInfo: cartInfo,
                    user_id: userData.userId
                }

                // save updated cartInfo in backend
                await setCart(data)
            }
            // if guest
            else {

                let product = cartInfo.filter((product) => product.product_id === product_id)[0];
                let index = cartInfo.indexOf(product);
                const updatedProduct = product.quantityValue = newQuantity

                cartInfo.with(index, updatedProduct);

                localStorage.setItem('cartInfo', JSON.stringify(cartInfo))
            }

            let object = document.getElementById(`quantity-${product_id}`)
            if (object) {
                object.innerHTML = newQuantity;
            }

            // Update price of cart
            updatePrices(cartInfo)
        }
        // changing quantity from specificProduct page
        else {
            setQuantityValue(newQuantity)
        }

    }

    return (
        <div className={`quantity-wrapper ${isCart ? 'quantity-cart-wrapper' : ''}`}>
            <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
                &mdash;
            </button>

            <span id={`quantity-${product_id}`} className="quantity-input__screen"> {quantityValue} </span>

            <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
                &#xff0b;
            </button>
        </div>
    );
}

export default Quantity;

