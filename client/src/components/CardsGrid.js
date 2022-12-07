import React from 'react';

import DivLoading from './DivLoading';

import './css/CardsGrid.css';

function CardsGrid({ data, renderCardHandle }) {
    return (
        data.length === 0 ? (
            <DivLoading />
        ) : (
            <div className='CardsGrid'>
                {
                    data.map(renderCardHandle)
                }
            </div>
        )
    )
}

export default CardsGrid;