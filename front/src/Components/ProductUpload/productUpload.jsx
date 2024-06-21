import React, { useState, useEffect, useRef } from 'react';

// CSS
import './productUpload.css';

// React MUI
import { TextField, Button, IconButton, Typography, Box } from '@mui/material';
import { AddAPhoto, Delete } from '@mui/icons-material';

// Services
import { roleVerification } from '../../Services/authenticationService';
import { sendProductsToImgbb, handleProductUpload, handleProductUpdate } from '../../Services/productsService';

function ProductUpload({ token, setIsProductUpload, isProductUpload, productInfo, setIsOptions, isOptions }) {

    // States
    const [isVerified, setIsVerified] = useState(false); // role by defualt is false
    const [title, setTitle] = useState('');
    const [images, setImages] = useState(productInfo ? productInfo.images : []);
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
        newImages[index] = { 'newImage': file };
        setImages(newImages);
    };

    const handleRemoveImage = async (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadedImages = [];

        console.log(images)
        for (const image of images) {
            if (image && image.newImage) {
                const formData = new FormData();
                formData.append('image', image.newImage);

                const response = await sendProductsToImgbb(formData)
                uploadedImages.push(response.data.url);
            }
        }

        let filterdExistingImages = images.filter(item => !(typeof item === 'object' && item.hasOwnProperty('newImage')));

        const newImages = filterdExistingImages.concat(uploadedImages);

        console.log(productInfo)


        // New product
        if (!productInfo || !productInfo._id) {
            const productData = {
                title,
                images: newImages,
                description,
                price,
                category,
                shippingFee
            };

            if (isVerified) await handleProductUpload(productData)
            window.location.href = ('/'); // Refresh page
        }
        // Edit product
        else {
      
            const updatedFields = {};

            if (title && title !== productInfo.title) updatedFields.title = title;
            if (newImages.length > 0) updatedFields.images = newImages;
            if (description && description !== productInfo.description) updatedFields.description = description;
            if (price && price !== productInfo.price) updatedFields.price = price;
            if (shippingFee && shippingFee !== productInfo.shippingFee) updatedFields.shippingFee = shippingFee;
            if (category && category !== productInfo.category) updatedFields.category = category;

            if (isVerified) await handleProductUpdate({ ...productInfo, ...updatedFields, id: productInfo._id });
            window.location.href = ('/'); // Refresh page
        }

    };


    return (
        <div className="products-upload-wrapper" ref={productUploadRef}>

            <Box component="form" onSubmit={handleSubmit} className="product-upload-form">

                <Typography variant="h5" component="h2" gutterBottom>
                    {isOptions ? 'Edit Product' : 'Upload Product'}
                </Typography>

                {!isOptions ? (
                    <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
                ) : (
                    <TextField label="Title" key={productInfo.title ? productInfo.title : null} defaultValue={productInfo.title ? productInfo.title : null} onChange={(e) => setTitle(e.target.value)} required fullWidth />
                )}

                <Typography variant="body1" gutterBottom> Images </Typography>

                <div className='products-upload-images-wrapper'>
                    <div className='products-upload-images-sub-wrapper'>
                        {[...Array(3)].map((_, index) => (
                            <Box className="products-upload-image-box" key={index}>
                                {images[index] ? (
                                    <>
                                        {!images[index].newImage ? (
                                            <>
                                                <img src={images[index]} alt={`img-${index}`} className="products-upload-uploaded-image" />
                                            </>
                                        ) : (
                                            <>
                                                <img src={URL.createObjectURL(images[index].newImage)} alt={`img-${index}`} className="products-upload-uploaded-image" />
                                            </>
                                        )}

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
                        ))}
                    </div>

                    <div className='products-upload-images-sub-wrapper'>
                        {[...Array(3)].map((_, index) => (
                            <Box className="products-upload-image-box" key={index}>
                                {images[index + 3] ? (
                                    <>
                                        {!images[index + 3].newImage ? (
                                            <>
                                                <img src={images[index + 3]} alt={`img-${index + 3}`} className="products-upload-uploaded-image" />
                                            </>
                                        ) : (
                                            <>
                                                <img src={URL.createObjectURL(images[index + 3].newImage)} alt={`img-${index + 3}`} className="products-upload-uploaded-image" />
                                            </>
                                        )}

                                        <IconButton onClick={() => handleRemoveImage(index + 3)} className="products-upload-remove-image-button">
                                            <Delete />
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton component="label" className="products-upload-add-image-button">
                                        <AddAPhoto />
                                        <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, index + 3)} />
                                    </IconButton>
                                )}
                            </Box>
                        ))}
                    </div>
                </div>

                {!isOptions ? (
                    <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
                ) : (
                    <TextField label="Description" key={productInfo.description ? productInfo.description : null} defaultValue={productInfo.description ? productInfo.description : null} onChange={(e) => setDescription(e.target.value)} fullWidth />
                )}

                {!isOptions ? (
                    <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required fullWidth />
                ) : (
                    <TextField label="Price" type="number" key={productInfo.price ? productInfo.price : null} defaultValue={productInfo.price ? productInfo.price : null} onChange={(e) => setPrice(e.target.value)} required fullWidth />
                )}

                <div className='products-upload-divider'>
                    {!isOptions ? (
                        <TextField label="Shipping Fee" type="number" value={shippingFee} onChange={(e) => setShippingFee(e.target.value)} required fullWidth />
                    ) : (
                        <TextField label="Shipping Fee" type="number" key={productInfo.shippingFee ? productInfo.shippingFee : null} defaultValue={productInfo.shippingFee ? productInfo.shippingFee : null} onChange={(e) => setShippingFee(e.target.value)} required fullWidth />
                    )}

                    {!isOptions ? (
                        <TextField label="Category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required fullWidth />
                    ) : (
                        <TextField label="Category" type="text" key={productInfo.category ? productInfo.category : null} defaultValue={productInfo.category ? productInfo.category : null} onChange={(e) => setCategory(e.target.value)} required fullWidth />
                    )}
                </div>

                <Button type="submit" variant="contained" color="primary">
                    {isOptions ? 'Save Changes' : 'Upload Product'}
                </Button>
            </Box>
        </div>
    );
}

export default ProductUpload;