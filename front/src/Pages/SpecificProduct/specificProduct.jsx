import React, { useEffect, useState } from 'react';
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

// Images
import noProductImg from '../../Assets/Images/no-product-img.jpg'

// Component
import Quantity from '../../Components/quantityComponent/quantity';


function SpecificProduct() {

    // States
    const [product, setProduct] = useState(null)
    const [quantityValue, setQuantityValue] = useState(1) // defualt value of quantity is 1


    // useParams - get id from URL
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
                        <Quantity quantityValue={quantityValue} setQuantityValue={setQuantityValue}/>
                    </div>

                    <Divider />

                    <Stack direction="column" spacing={1}>
                        <Button variant='contained'> Buy Now </Button>

                        <Button> Add To Cart </Button>
                    </Stack>
                </Card>
            </div>
        </div>
    );
}

export default SpecificProduct;

