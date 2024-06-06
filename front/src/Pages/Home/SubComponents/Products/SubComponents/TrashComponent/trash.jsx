import React, { useEffect, useRef } from 'react';

// CSS
import './trash.css';

// Services
import { handleProductDeletion } from '../../../../../../Services/productsService';


function Trash({ productInfo, setIsTrash, isTrash }) {

    // Refs
    const trashRef = useRef(null);

    // Close Trash when clicking outside of the component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (trashRef.current && !trashRef.current.contains(event.target)) {
                if (isTrash) { // if trash component is on
                    setIsTrash(false)
                }
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    // Handle product deletion
    const deleteProduct = async () => {
        await handleProductDeletion(productInfo._id)
        window.location.href = ('/')
    }

    return (
        <div className='trash-inner-wrapper' ref={trashRef}>
            <span className='trash-title'> Are you sure?</span>

            <div className='trash-options-wrapper'>
                <button className='trash-button' onClick={() => setIsTrash(false)}> NO </button>
                <button className='trash-button' onClick={() => deleteProduct()}> YES </button>
            </div>
        </div>
    );
}

export default Trash;
