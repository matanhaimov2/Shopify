import React, { useState } from 'react';

// CSS
import './options.css';

// React MUI
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// React Icons
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

// Components
import ProductUpload from '../../../../../Components/ProductUpload/productUpload';

// Sub Components
import Trash from './TrashComponent/trash';


function Options({ token, productInfo, setIsOptions, isOptions }) {

    // States
    const [isEdit, setIsEdit] = useState(false)
    const [isTrash, setIsTrash] = useState(false)

    return (
        <div>
            <ButtonGroup className='options-wrapper' variant="contained" aria-label="Basic button group">
                <Button onClick={() => setIsEdit(!isEdit)}> <CiEdit className='options-button' /> </Button>
                <Button onClick={() => setIsTrash(!isTrash)}> <MdDeleteOutline className='options-button' /> </Button>
            </ButtonGroup>

            {isEdit && (
                <div className='categories-product-upload-wrapper'>
                    <ProductUpload token={token} productInfo={productInfo} setIsOptions={setIsOptions} isOptions={isOptions} />
                </div>
            )}

            {isTrash && (
                <div className='options-delete-wrapper'>
                    <Trash productInfo={productInfo} setIsTrash={setIsTrash} isTrash={isTrash} />
                </div>
            )}
        </div>
    );
}

export default Options;
