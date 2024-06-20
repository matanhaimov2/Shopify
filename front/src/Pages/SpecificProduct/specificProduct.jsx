import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

// React MUI
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// CSS
import './specificProduct.css';

// Services
import { fetchSpecificProduct } from '../../Services/productsService';
import { sendDataToCart } from '../../Services/cartService'

// Images
import noProductImg from '../../Assets/Images/no-product-img.jpg'

// Component
import Quantity from '../../Components/quantityComponent/quantity';
import { AuthContext } from '../../Components/AuthContext';


function SpecificProduct() {

    // States
    const [product, setProduct] = useState(null)
    const [quantityValue, setQuantityValue] = useState(1) // defualt value of quantity is 1

    const { userData } = useContext(AuthContext);

    // useParams - get product id from URL
    const { id } = useParams()

    useEffect(() => {
        const getProductInfo = async () => {

            const response = await fetchSpecificProduct(id);
            console.log('Fetched product:', response);
            setProduct(response[0]);

        }

        getProductInfo();
    }, [id])

    const changePhoto = (img) => {
        // here => handle photo change functionallity
    }

    // Add selected product to cart
    const addToCart = async () => {

        let userId = null;

        // checks if userData exist (if user logged in)
        if (userData) userId = userData.userId;

        let data = {
            product_id: product._id,
            title: product.title,
            image: product.images[0],
            price: product.price,
            shippingFee: product.shippingFee,
            quantityValue: quantityValue
        }

        // For admin/user
        if (userData && userData.role) {
            // checks if user has an id
            if (userId) data.user_id = userId;

            await sendDataToCart(data)
        }
        // For guest
        else {
            // checks if cartInfo exists or not
            let cartInfo = localStorage.getItem("cartInfo") ? JSON.parse(localStorage.getItem("cartInfo")) : null;

            // if cartInfo exists - add another product
            if (cartInfo) {

                let isDuplicate = false;


                for (let item of cartInfo) {
                    // Check for duplicate
                    console.log(data)
                    console.log(item)
                    if (item.product_id === data.product_id) {
                        isDuplicate = true;
                        item.quantityValue += data.quantityValue;

                        // duplicate occured - update the quantity of the existing product
                        try {
                            localStorage.setItem("cartInfo", JSON.stringify(cartInfo));

                        } catch (error) {
                            console.error('Error updating quantity:', error);
                        }

                        break;

                    }

                }

                // no duplicate occured - push new product
                if (!isDuplicate) {
                    cartInfo.push(data)
                    localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
                }

            }
            // if cartInfo empty - create object with array (first product uploaded to cart)
            else {
                localStorage.setItem('cartInfo', JSON.stringify([data]));
            }
        }


    }

    return (
        <div className='specificProduct-wrapper'>
            <div className='specificProduct-left-wrapper'>

                {product && product.images ? (
                    <img className='products-image specificProduct-main-image' src={product.images[0]} />
                ) : (
                    <img className='products-image specificProduct-main-image' src={noProductImg}></img>
                )}

                {product && product.images.length >= 1 ? (
                    product.images.slice(1).map((img, index) => (
                        <img key={index} onClick={() => changePhoto(img)} className='products-image specificProduct-image' src={img} alt={`Product Image ${index + 1}`} />
                    ))
                ) : (
                    <img className='products-image specificProduct-image' src={noProductImg}></img>
                )}

            </div>

            <div className='specificProduct-middle-wrapper'>
                {product && product.price && (
                    <>
                        <div className='specificProduct-inner-middle'>
                            <span> {product.price}₪ </span>
                            <span> {product.title} </span>
                        </div>

                        <span> {product.description} </span>
                    </>
                )}
            </div>

            <div className='specificProduct-right-wrapper'>
                <Card variant="outlined">
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography gutterBottom variant="h5" component="div"> Shipping Fee: </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {product && (
                                    <span> {product.shippingFee}₪ </span>
                                )}
                            </Typography>
                        </Stack>
                        <Typography color="text.secondary" variant="body2"> From place-here </Typography>
                        <Typography color="text.secondary" variant="body2"> Estimated delivery within 14 days </Typography>
                    </Box>

                    <Divider />

                    <div className='specificProduct-quantity-wrapper'>
                        <Typography className='specificProduct-quantity' gutterBottom variant="body2"> Quantity </Typography>
                        <Quantity quantityValue={quantityValue} setQuantityValue={setQuantityValue} />
                    </div>

                    <Divider />

                    <Stack direction="column" spacing={1}>
                        <Button variant='contained'> Buy Now </Button>

                        <Button onClick={addToCart}> Add To Cart </Button>
                    </Stack>
                </Card>
            </div>
        </div>
    );
}

export default SpecificProduct;

