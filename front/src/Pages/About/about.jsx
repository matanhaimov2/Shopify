import React, { useState, useEffect } from 'react';


// CSS
import './about.css';

// Components
import Footer from '../../Components/Footer/footer';

function About() {

    return (
        <div className='about-wrapper'>
            <section className='about-sub-wrapper'>
                <div className='about-contents-wrapper'>
                    <h1>About Us</h1>

                    <span>We are.....</span>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default About;