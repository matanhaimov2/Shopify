import React, { useState } from 'react';

// CSS
import './quantity.css';

function Quantity({ quantityValue, setQuantityValue }) {

    const increment = () => {
        setQuantityValue(quantityValue + 1)
    }

    const decrement = () => {
        if (quantityValue === 0) {
            setQuantityValue(0)
        }
        else {
            setQuantityValue(quantityValue - 1)
        }
        // note: if & else dont work on jsx: setQuantityValue(quantityValue == 0 ? setQuantityValue(0) : setQuantityValue(quantityValue - 1))
    }

    return (
        <div className='quantity-wrapper'>
            <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
                &mdash;
            </button>
            
            <span className="quantity-input__screen"> {quantityValue} </span>

            <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
                &#xff0b;
            </button>
        </div>
    );
}

export default Quantity;

