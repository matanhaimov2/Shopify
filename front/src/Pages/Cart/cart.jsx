import React, { useState, useEffect, useContext } from 'react';

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
import { AuthContext } from '../../Components/AuthContext';
import PaypalPayment from '../../Components/PaypalPayment/PaypalPayment';

// Services
import { getDataFromCart } from '../../Services/cartService';
import { verifyPrices, setCart } from '../../Services/cartService';

function Cart() {

    // States 
    const [cartInfo, setCartInfo] = useState();
    const [totalPrice, setTotalPrice] = useState(); // products total price 
    const [totalShippingFee, setTotalShippingFee] = useState(); // products total shippingFee 
    const [overallPrice, setOverallPrice] = useState(); // products overall cost (price and shippingFee)
    const [checked, setChecked] = useState([]);
    const [countProducts, setCountProducts] = useState(0);
    const [paymentData, setPaymentData] = useState();

    const { userData } = useContext(AuthContext);

    // Get cartInfo
    useEffect(() => {
        const getCartInfo = async () => {
            // if user/admin
            if (userData) {
                const cartInfoResponse = await getDataFromCart(userData.userId)
                setCartInfo(cartInfoResponse.cartInfo)
                updatePrices(cartInfoResponse.cartInfo); // initialize prices
                setChecked(new Array(cartInfoResponse.cartInfo.length).fill(true)); // initialize the checked state
            }
            // if guest
            else {
                const guestCartInfo = JSON.parse(localStorage.getItem('cartInfo'));
                setCartInfo(guestCartInfo);
                if (guestCartInfo) updatePrices(guestCartInfo); // initialize prices
                if (guestCartInfo) setChecked(new Array(guestCartInfo.length).fill(true)); // initialize the checked state
            }
        }

        getCartInfo()

    }, [])

    // Gets the length of cart product that checked
    useEffect(() => {
        const getCheckedCount = () => {
            return cartInfo ? cartInfo.length : 0;
        };

        setCountProducts(getCheckedCount())
    }, [cartInfo])

    // Verify prices
    useEffect(() => {
        const pricesVerification = async () => {
            // if guest
            if (cartInfo && !userData) {
                // verify prices with backend
                let data = []

                for (let i of cartInfo) {
                    let object = {
                        title: i.title,
                        product_id: i.product_id,
                        price: i.price,
                        quantityValue: i.quantityValue,
                        shippingFee: i.shippingFee
                    }

                    data.push(object)
                }

                let purchase_data = {
                    cartInfo: data,
                    overallPrice: totalPrice
                }

                try {
                    let verifyData = {
                        ...purchase_data,
                        overallPrice
                    }

                    let isValid = await verifyPrices(verifyData);
                    if (isValid) {
                        console.log('Proceed');
                        setPaymentData(purchase_data)

                    } else {
                        // Handle error - prices don't match
                        console.log('Error: Prices do not match for product');
                    }
                } catch (error) {
                    console.error('Error verifying prices:', error);
                }
            }
            // if user/admin
            else if (cartInfo && userData) {
                console.log('Proceed')
                let purchase_data = {
                    cartInfo: cartInfo,
                    overallPrice: totalPrice
                }

                setPaymentData(purchase_data)

            }
        }

        pricesVerification()
    }, paymentData)

    // Function to update prices based on cart items
    const updatePrices = (cartItems) => {
        // Calculate sum of prices
        const sumPrice = cartItems.reduce((acc, item) => acc + item.quantityValue * (parseFloat(item.price)), 0);
        setTotalPrice(sumPrice);

        // Calculate sum of shipping fees
        const sumShippingFees = cartItems.reduce((acc, item) => acc + parseFloat(item.shippingFee), 0);
        setTotalShippingFee(sumShippingFees);

        // Calculate overall price
        setOverallPrice(sumPrice + sumShippingFees);
    };

    // Handle check changes
    const handleCheckChange = (index) => {
        const updatedChecked = [...checked];
        updatedChecked[index] = !updatedChecked[index];
        setChecked(updatedChecked);

        // Recalculate prices based on checked items
        const checkedItems = cartInfo.filter((item, i) => updatedChecked[i]);
        updatePrices(checkedItems);
    };

    // Delete product from cartInfo
    const deleteSelectedFromCart = async (index, product_id) => {
        let updatedCartInfo = cartInfo.filter((item, i) => i !== index);

        // if user/admin
        if (userData) {
            let data = {
                user_id: userData.userId,
                cartInfo: updatedCartInfo
            }

            await setCart(data)
        }
        // if guest
        else {
            localStorage.setItem('cartInfo', JSON.stringify(updatedCartInfo))
        }

        setCartInfo(updatedCartInfo);
        updatePrices(updatedCartInfo);
        setChecked(new Array(updatedCartInfo.length).fill(true)); // Reinitialize the checked state
    };


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

                            <span> Price: {totalPrice}₪</span>

                            <span> Shipping Fee: {totalShippingFee}₪ </span>

                            <span> Overall: {overallPrice}₪</span>

                            {paymentData ? (
                                <PaypalPayment paymentData={paymentData} />
                            ) : (
                                <span> prices don't match </span>
                            )}

                            <Divider />

                            <span> Pay with: </span>

                            <div className='cart-payment-icons-wrapper'>
                                <img src={visa_icon} className='cart-payment-icons'></img>
                                <img src={mastercard_icon} className='cart-payment-icons'></img>
                                <img src={paypal_icon} className='cart-payment-icons'></img>

                            </div>

                        </div>

                        <div className='cart-detail-info-wrapper'>
                            <span className='cart-detail-title'> Shopping Cart ({countProducts}) </span>
                            
                            {cartInfo && cartInfo.map((item, i) => (
                                <div id={`product-${item.product_id}`} className={`cart-detail-info-product-wrapper ${checked[i] ? '' : 'cart-detail-info-disabled'}`} key={i}>
                                    <Checkbox checked={checked[i]} onChange={() => handleCheckChange(i)} />

                                    <div className='cart-detail-info-image-wrapper'>
                                        <img src={item.image} className='cart-detail-info-image'></img>
                                    </div>

                                    <div className='cart-detail-info-titles-wrapper'>
                                        <span> {item.title} </span>
                                        <span> {item.price}₪ </span>
                                        {item.shippingFee === 0 ? (
                                            <span>Free Shipping</span>
                                        ) : (
                                            <span>+Shipping: {item.shippingFee}₪</span>
                                        )}
                                    </div>
                                    
                                    <div className='cart-detail-info-quantity-wrapper'>
                                        <Quantity isCart={true} quantityValue={item.quantityValue} userData={userData} cartInfo={cartInfo} product_id={item.product_id} updatePrices={updatePrices} />
                                    </div>

                                    <div className='cart-detail-info-delete-wrapper'>
                                        <Tooltip title="Delete" className='cart-detail-info-delete' onClick={() => deleteSelectedFromCart(i, item.product_id)}>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cart;