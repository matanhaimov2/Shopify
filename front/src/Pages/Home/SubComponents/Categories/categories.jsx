import React, { useState, useEffect, useContext } from 'react';


// CSS
import './categories.css';

// React Icons
import { FaComputer } from "react-icons/fa6";
import { GiDelicatePerfume } from "react-icons/gi";

// Services
import { roleVerification } from '../../../../Services/authenticationService';

// Components
import { AuthContext } from "../../../../Components/AuthContext";


function Categories({ token }) {

    // States
    const [isVerified, setIsVerified] = useState(false); // role by defualt is false

    // Global States
    const { userData } = useContext(AuthContext);

    // Role Verification
    useEffect(() => {
        const verifyRole = async () => {
            try {
                const data = await roleVerification(token);
                if(data) {
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

    );
}

export default Categories;