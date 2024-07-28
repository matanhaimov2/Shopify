import React from 'react';

// CSS
import './footer.css';

// React Icons
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

// Components
import Contact from '../Contact/contact';

function Footer() {

    return (
        <div className='footer-sub-wrapper'>

            <Contact />
            
            <div className='footer-contents-wrapper'>
                <a href='' className='footer-contents'> <FaFacebook /> </a>
                <a href='' className='footer-contents'> <FaInstagram /> </a>
                <a href='' className='footer-contents'> <FaTiktok /> </a>
                <a href='' className='footer-contents'> <FaWhatsapp /> </a>
                <a href='' className='footer-contents'> <FaYoutube /> </a>

            </div>

            <h4 className='footer-link-wrapper'> Copyright © 2024 &nbsp; <a href='/' className='footer-link-title'> Shopify's Team. </a> &nbsp; All Rights Reserved.</h4>
        </div>
    );
}

export default Footer;