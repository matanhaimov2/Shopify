import React, { useState, useEffect, useRef } from 'react';

// CSS
import './productUpload.css';

// React MUI
import { TextField, Button, IconButton, Typography, Box, Grid } from '@mui/material';
import { AddAPhoto, Delete } from '@mui/icons-material';

// Services
import { roleVerification } from '../../Services/authenticationService';
import { sendProductsToImgbb, handleProductsPost } from '../../Services/productsService';

function ProductUpload({ token, setIsProductUpload, isProductUpload }) {

    // States
    const [isVerified, setIsVerified] = useState(false); // role by defualt is false
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [shippingFee, setShippingFee] = useState('');

    // Refs
    const productUploadRef = useRef(null);

    // Close ProductUpload when clicking outside of the component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (productUploadRef.current && !productUploadRef.current.contains(event.target)) {
                if (isProductUpload) { // upload new product form
                    setIsProductUpload(false)
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
        const albumId = 'sKn8Vz'; // album doesn't work
        for (const image of images) {
            if (image) {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('album', albumId); // Include album ID in the form data

                const response = await sendProductsToImgbb(formData)
                uploadedImages.push(response.data.url);
            }
        }

        const productData = {
            title,
            images: uploadedImages,
            description,
            price,
            shippingFee,
        };

        await handleProductsPost(productData)
    };


    return (
        <div className='products-upload-wrapper' ref={productUploadRef}>

            <Box component="form" onSubmit={handleSubmit} className="product-upload-form">

                <Typography variant="h5" component="h2" gutterBottom> Upload Product </Typography>

                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />

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

                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline rows={4} fullWidth />

                <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required fullWidth />

                <TextField label="Shipping Fee" type="number" value={shippingFee} onChange={(e) => setShippingFee(e.target.value)} required fullWidth />

                <Button type="submit" variant="contained" color="primary"> Upload Product </Button>
            </Box>
        </div>
    );
}

export default ProductUpload;