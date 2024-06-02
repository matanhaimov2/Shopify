import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import './categories.css';

// React Icons
import { FaComputer } from "react-icons/fa6";
import { GiDelicatePerfume } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { GiChessQueen } from "react-icons/gi";
import { FaUser } from "react-icons/fa";




// React MUI
import Button from '@mui/material/Button';


// Services
import { roleVerification } from '../../../../Services/authenticationService';

// Components
import { AuthContext } from "../../../../Components/AuthContext";


function Categories({ token }) {

    // States
    const [isVerified, setIsVerified] = useState(false); // role by defualt is false

    // Global States
    const { userData, handleLogout } = useContext(AuthContext);

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

    return (
        <div className='categories-wrapper'>
            <div>
                <h2>Our Selection</h2>

                <span className='home-underline'></span>

                <div className='categories-selection-wrapper'>
                    <div className='categories-icon-wrapper'>
                        <FaComputer className='categories-icon' />
                    </div>

                    <span className='categories-text-wrapper'>Electronics</span>
                </div>

                <div className='categories-selection-wrapper'>
                    <div className='categories-icon-wrapper'>
                        <GiDelicatePerfume className='catgories-icon' />
                    </div>

                    <span className='categories-text-wrapper'>Cosmetics</span>
                </div>
            </div>

            {userData ? (
                <div className='products-user'>
                    <Button variant="outlined" startIcon={<CiLogout />} onClick={handleLogout}>Logout</Button>
                    <div className='products-user-info'>
                    {isVerified ? (
                        <GiChessQueen style={{color: "#D1B000"}}/>
                    ) : (
                        <FaUser style={{color: "gray"}}/>
                    )}
                    </div>
                </div>
            ) : (
                <div className='products-user'>
                    <Button variant="contained" color='success' startIcon={<CiLogin />} onClick={navigateToLogin}>Login</Button>
                </div>
            )}
        </div>

    );
}

export default Categories;