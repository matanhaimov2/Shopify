import React, { useState, useEffect } from 'react';


// CSS
import './categories.css';

// React Icons
import { FaComputer } from "react-icons/fa6";
import { GiDelicatePerfume } from "react-icons/gi";

function Categories() {

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