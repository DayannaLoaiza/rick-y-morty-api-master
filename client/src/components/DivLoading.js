import React from 'react';

import {Loader} from 'react-feather';

import './css/DivLoading.css';

function DivLoading(){
    return (
        <div className='DivLoading'>
            <Loader size='2.5rem' />
        </div>
    )
}

export default DivLoading;