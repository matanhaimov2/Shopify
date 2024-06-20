import React, { useState, useEffect } from 'react';

// CSS
import './cart.css';

// React MUI
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Images
import visa_icon from '../../Assets/Images/visa_icon.png'
import mastercard_icon from '../../Assets/Images/mastercard_icon.png'
import paypal_icon from '../../Assets/Images/paypal_icon.png'

// Components
import Quantity from '../../Components/quantityComponent/quantity';

function Cart() {


    return (
        <div className='cart-wrapper'>
            <section className='cart-sub-wrapper'>
                <div className='cart-contents-wrapper'>
                    <div className='cart-title-wrapper'>
                        <h1>Cart</h1>
                    </div>


                    <div className='cart-detail-wrapper'>
                        <div className='cart-detail-summary-wrapper'>
                            <span className='cart-detail-title'> Summary </span>

                            <span> Price: </span>

                            <span> Shipping Fee: </span>

                            <span> Overall: </span>

                            <Button variant="outlined"> Buy Now </Button>

                            <Divider />

                            <span> Pay with: </span>

                            <div className='cart-payment-icons-wrapper'>
                                <img src={visa_icon} className='cart-payment-icons'></img>
                                <img src={mastercard_icon} className='cart-payment-icons'></img>
                                <img src={paypal_icon} className='cart-payment-icons'></img>

                            </div>

                        </div>

                        <div className='cart-detail-info-wrapper'>
                            <span className='cart-detail-title'> Shopping Cart </span>

                            {/* map here */}
                            <div className='cart-detail-info-product-wrapper'>
                                <Checkbox defaultChecked />

                                <img src={visa_icon}></img>

                                <div className='cart-detail-info-titles-wrapper'>
                                    <span> Title </span>
                                    <span> Price </span>
                                    <span> Shipping Fee </span>
                                </div>

                                <div className='cart-detail-info-quantity-wrapper'>
                                    <Quantity />
                                    {/* quantityValue={quantityValue} setQuantityValue={setQuantityValue}  */}
                                </div>

                                <Tooltip title="Delete">
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default Cart;