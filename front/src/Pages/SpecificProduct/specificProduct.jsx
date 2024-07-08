import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

// React MUI
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
    const [open, setOpen] = useState(false); // open snackbar
    const [mainImage, setMainImage] = useState(noProductImg); // set main image of product
    const [smallImages, setSmallImages] = useState([]); // add secondary images for product

    const { userData } = useContext(AuthContext);

    // useParams - get product id from URL
    const { id } = useParams()

    useEffect(() => {
        const getProductInfo = async () => {
            const response = await fetchSpecificProduct(id);
            setProduct(response[0]);

            // Set main image to the first image and small images as secondary
            if (response[0].images && response[0].images.length > 0) {
                setMainImage(response[0].images[0]);
                setSmallImages(response[0].images.slice(1));
            }
        }

        getProductInfo();
    }, [id])

    // Handle photo changing logic
    const changePhoto = (newImage) => {
        setMainImage(newImage);
        setSmallImages(prevImages => {
            // Filter out the newImage from prevImages array (if it exists)
            const filteredImages = prevImages.filter(img => img !== newImage);

            // Add the current mainImage to smallImages array if it's not already present
            if (!filteredImages.includes(mainImage)) {
                filteredImages.push(mainImage);
            }

            return filteredImages;
        });
    }

    // Add selected product to cart
    const addToCart = async () => {

        setOpen(true);

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
            let cartInfo = JSON.parse(localStorage.getItem("cartInfo")) || null;

            // if cartInfo exists - add another product
            if (cartInfo) {

                let isDuplicate = false;


                for (let item of cartInfo) {
                    // Check for duplicate

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

    // Snackbar handler
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div className='specificProduct-wrapper'>
            <div className='specificProduct-left-wrapper'>

                <img className='products-image specificProduct-main-image' src={mainImage} alt="Main Product" />

                <div className='specificProduct-image-wrapper'>
                    {smallImages.map((img, index) => (
                        <img key={index} onClick={() => changePhoto(img)} className='products-image specificProduct-image' src={img} alt={`Product Image ${index + 1}`} />
                    ))}
                </div>

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
                        <Quantity quantityValue={quantityValue} setQuantityValue={setQuantityValue} product_id={id} />
                    </div>

                    <Divider />

                    <Stack direction="column" spacing={1} style={{ padding: "5%" }}>
                        <Button variant='contained' onClick={addToCart}> Add To Cart </Button>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message="Item added to cart" action={action} />
                    </Stack>
                </Card>

                {/* google maps api */}
                {product && product.address[0] && (
                    <div className='specificProduct-map-wrapper'>
                        <APIProvider apiKey={'AIzaSyDWtIjrguMXBNFSPpDaeSU3XinyOSGr03Q'} onLoad={() => console.log('Maps API has loaded.')}>
                            <Map
                                defaultZoom={13}
                                defaultCenter={{ lat: product.address[1].lat, lng: product.address[1].lng }}
                                mapId='DEMO_MAP_ID'
                                onCameraChanged={(ev) =>
                                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                                }>
                                <AdvancedMarker position={{ lat: product.address[1].lat, lng: product.address[1].lng }}>
                                    <Pin
                                        background={'red'}
                                        borderColor={'#006425'}
                                        glyphColor={'white'}
                                    />
                                </AdvancedMarker>
                            </Map>
                        </APIProvider>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SpecificProduct;

