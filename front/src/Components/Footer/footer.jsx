import React, { useState, useEffect } from 'react';


// CSS
import './footer.css';


function Footer() {

    return (
        <section className='footer-wrapper'>
            <div className='footer-sub-wrapper'>
                <div className='footer-contents-wrapper'>
                    <span> Links here!</span>
                </div>

                <h4 className='footer-link-wrapper'> Copyright © 2024 <a href='/' className='footer-link-title'>Shopify's Team.</a> All Rights Reserved.</h4>
            </div>
        </section>

    );
}

export default Footer;