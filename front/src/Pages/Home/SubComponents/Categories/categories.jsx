import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import { slide as Menu } from 'react-burger-menu';

// CSS
import './categories.css';

// React Icons
import { FaComputer } from "react-icons/fa6";
import { GiDelicatePerfume } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { GiChessQueen } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { CgGames } from "react-icons/cg";
import { IoInfiniteSharp } from "react-icons/io5";

// React MUI
import Button from '@mui/material/Button';

// Services
import { roleVerification } from '../../../../Services/authenticationService';

// Components
import { AuthContext } from "../../../../Components/AuthContext";
import ProductUpload from '../../../../Components/ProductUpload/productUpload';


function Categories({ token }) {

    // States
    const [isVerified, setIsVerified] = useState(false); // role by defualt is false
    const [isProductUpload, setIsProductUpload] = useState(false);

    // Global States
    const { userData, setUserData, setCurrentCategory, isOpenMenu, setIsOpenMenu } = useContext(AuthContext);

    // Handle responsive
    const isTabletOrPhone = useMediaQuery({ query: '(max-width: 860px)' })

    // Navigation Handle
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login')
    }

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

    // Handle categories change
    const handleCategoryChange = (title) => {
        setCurrentCategory(title)
        setIsOpenMenu(false)
    }

    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem('accessToken');
        window.location.reload();
    }

    return (
        <div className='categories-wrapper'>
            {!isTabletOrPhone ? (
                <div className='categories-sub-wrapper'>
                    <div>
                        <h2>Our Selection</h2>

                        <span className='home-underline'></span>

                        <div className='categories-selection-wrapper' onClick={() => { setCurrentCategory('ALL') }}>
                            <div className='categories-icon-wrapper'>
                                <IoInfiniteSharp className='categories-icon' />
                            </div>

                            <span className='categories-text-wrapper'>Everything</span>
                        </div>

                        <div className='categories-selection-wrapper' onClick={() => { setCurrentCategory('Electronics') }}>
                            <div className='categories-icon-wrapper'>
                                <FaComputer className='categories-icon' />
                            </div>

                            <span className='categories-text-wrapper'>Electronics</span>
                        </div>

                        <div className='categories-selection-wrapper' onClick={() => { setCurrentCategory('Games & Toys') }}>
                            <div className='categories-icon-wrapper'>
                                <CgGames className='categories-icon' />
                            </div>

                            <span className='categories-text-wrapper'>Games & Toys</span>
                        </div>

                        <div className='categories-selection-wrapper' onClick={() => { setCurrentCategory('Cosmetics') }}>
                            <div className='categories-icon-wrapper'>
                                <GiDelicatePerfume className='categories-icon' />
                            </div>

                            <span className='categories-text-wrapper'>Cosmetics</span>
                        </div>
                    </div>

                    {userData ? (
                        <div className='categories-products-user-wrapper'>
                            {isVerified && (
                                <Button variant="outlined" onClick={() => setIsProductUpload(!isProductUpload)}>Upload Product</Button>
                            )}

                            <div className='categories-products-user'>
                                <Button variant="outlined" startIcon={<CiLogout />} onClick={handleLogout}>Logout</Button>
                                <div className='categories-products-user-info'>
                                    {isVerified ? (
                                        <GiChessQueen style={{ color: "#D1B000" }} />
                                    ) : (
                                        <FaUser style={{ color: "gray" }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='categories-products-user'>
                            <Button variant="contained" color='success' startIcon={<CiLogin />} onClick={navigateToLogin}>Login</Button>
                        </div>
                    )}

                    {isVerified && isProductUpload && (
                        <div className='categories-product-upload-wrapper'>
                            <ProductUpload token={token} setIsProductUpload={setIsProductUpload} isProductUpload={isProductUpload} />
                        </div>
                    )}
                </div>

            ) : (
                <Menu isOpen={isOpenMenu} customBurgerIcon={false} left>
                    <div>
                        <h2>Our Selection</h2>

                        <span className='home-underline'></span>

                        <div className='categories-selection-wrapper' onClick={() => { handleCategoryChange('ALL') }}>
                            <div className='categories-icon-wrapper'>
                                <IoInfiniteSharp className='categories-icon' />
                            </div>

                            <span className='categories-text-wrapper'>Everything</span>
                        </div>

                        <div className='categories-selection-wrapper' onClick={() => { handleCategoryChange('Electronics') }}>
                            <div className='categories-icon-wrapper'>
                                <FaComputer className='categories-icon' />
                            </div>

                            <span className='categories-text-wrapper'>Electronics</span>
                        </div>

                        <div className='categories-selection-wrapper' onClick={() => { handleCategoryChange('Games & Toys') }}>
                            <div className='categories-icon-wrapper'>
                                <CgGames className='categories-icon' />
                            </div>

                            <span className='categories-text-wrapper'>Games & Toys</span>
                        </div>

                        <div className='categories-selection-wrapper' onClick={() => { handleCategoryChange('Cosmetics') }}>
                            <div className='categories-icon-wrapper'>
                                <GiDelicatePerfume className='categories-icon' />
                            </div>

                            <span className='categories-text-wrapper'>Cosmetics</span>
                        </div>
                    </div>

                    {userData ? (
                        <div className='categories-products-user-wrapper'>
                            {isVerified && (
                                <Button variant="outlined" onClick={() => setIsProductUpload(!isProductUpload)}>Upload Product</Button>
                            )}

                            <div className='categories-products-user'>
                                <Button variant="outlined" startIcon={<CiLogout />} onClick={handleLogout}>Logout</Button>
                                <div className='categories-products-user-info'>
                                    {isVerified ? (
                                        <GiChessQueen style={{ color: "#D1B000" }} />
                                    ) : (
                                        <FaUser style={{ color: "gray" }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='categories-products-user'>
                            <Button variant="contained" color='success' startIcon={<CiLogin />} onClick={navigateToLogin}>Login</Button>
                        </div>
                    )}

                    {isVerified && isProductUpload && (
                        <div className='categories-product-upload-wrapper'>
                            <ProductUpload token={token} setIsProductUpload={setIsProductUpload} isProductUpload={isProductUpload} />
                        </div>
                    )}
                </Menu>
            )}
        </div>
    );
}

export default Categories;