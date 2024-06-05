import React, { useState, useEffect, useRef } from 'react';

// CSS
import './productUpload.css';

// React MUI
import { TextField, Button, IconButton, Typography, Box, Grid } from '@mui/material';
import { AddAPhoto, Delete } from '@mui/icons-material';

// Services
import { roleVerification } from '../../Services/authenticationService';
import { sendProductsToImgbb, handleProductUpload, handleProductUpdate } from '../../Services/productsService';

function ProductUpload({ token, setIsProductUpload, isProductUpload, productInfo, setIsOptions, isOptions }) {

    // States
    const [isVerified, setIsVerified] = useState(false); // role by defualt is false
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [shippingFee, setShippingFee] = useState('');

    // Refs
    const productUploadRef = useRef(null);

    // Close ProductUpload when clicking outside of the component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (productUploadRef.current && !productUploadRef.current.contains(event.target)) {
                if (isProductUpload) { // if upload new product form is on
                    setIsProductUpload(false)
                }
                else if (isOptions) { // if edit product form is on
                    setIsOptions(false)
                }
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    // Role Verification
    useEffect(() => {
        const verifyRole = async () => {
            try {
                const data = await roleVerification(token);
                if (data) {
                    setIsVerified(true);
                }
                else {
                    setIsVerified(false);
                }
            } catch (error) {
                console.error('Role verification failed', error);
                setIsVerified(false);
            }
        };

        verifyRole();
    }, [token, isVerified]);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadedImages = [];

        for (const image of images) {
            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                const response = await sendProductsToImgbb(formData)
                uploadedImages.push(response.data.url);
            }
        }

        const productData = {
            title,
            images: uploadedImages,
            description,
            price,
            category,
            shippingFee
        };

        if (!productInfo || !productInfo._id) {
            await handleProductUpload(productData)
        }
        else {
            console.log('gay')
            await handleProductUpdate({ ...productData, id: productInfo._id });
        }
    };


    return (
        <div className="products-upload-wrapper" ref={productUploadRef}>

            <Box component="form" onSubmit={handleSubmit} className="product-upload-form">

                {!isOptions ? (
                    <Typography variant="h5" component="h2" gutterBottom> Upload Product </Typography>
                ) : (
                    <Typography variant="h5" component="h2" gutterBottom> Edit Product </Typography>
                )}

                {!isOptions ? (
                    <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
                ) : (
                    <TextField label="Title" defaultValue={productInfo.title ? productInfo.title : null} onChange={(e) => setTitle(e.target.value)} required fullWidth />
                )}

                <Typography variant="body1" gutterBottom> Images </Typography>

                <Grid container spacing={2}>
                    {[...Array(6)].map((_, index) => (
                        <Grid item xs={4} key={index}>
                            <Box className="products-upload-image-box">
                                {images[index] ? (
                                    <>
                                        <img src={URL.createObjectURL(images[index])} alt={`img-${index}`} className="products-upload-uploaded-image" />
                                        <IconButton onClick={() => handleRemoveImage(index)} className="products-upload-remove-image-button">
                                            <Delete />
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton component="label" className="products-upload-add-image-button">
                                        <AddAPhoto />
                                        <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, index)} />
                                    </IconButton>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {!isOptions ? (
                    <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline rows={4} fullWidth />
                ) : (
                    <TextField label="Description" defaultValue={productInfo.description ? productInfo.description : null} onChange={(e) => setTitle(e.target.value)} required fullWidth />
                )}

                {!isOptions ? (
                    <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required fullWidth />
                ) : (
                    <TextField label="Price" type="number" defaultValue={productInfo.price ? productInfo.price : null} onChange={(e) => setPrice(e.target.value)} required fullWidth />
                )}

                <div className='products-upload-divider'>
                    {!isOptions ? (
                        <TextField label="Shipping Fee" type="number" value={shippingFee} onChange={(e) => setShippingFee(e.target.value)} required fullWidth />
                    ) : (
                        <TextField label="Shipping Fee" type="number" defaultValue={productInfo.shippingFee ? productInfo.shippingFee : null} onChange={(e) => setShippingFee(e.target.value)} required fullWidth />
                    )}

                    {!isOptions ? (
                        <TextField label="Category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required fullWidth />
                    ) : (
                        <TextField label="Category" type="text" defaultValue={productInfo.category ? productInfo.category : null} onChange={(e) => setCategory(e.target.value)} required fullWidth />
                    )}
                </div>

                {!isOptions ? (
                    <Button type="submit" variant="contained" color="primary"> Upload Product </Button>
                ) : (
                    <Button type="submit" variant="contained" color="primary"> Save Changes </Button>
                )}
            </Box>
        </div>
    );
}

export default ProductUpload;