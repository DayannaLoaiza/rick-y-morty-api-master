import React from 'react';

function ContentTitle({title, total, isCrud, newRecordHandle}){
    return (
        <div className='d-flex flex-row'>
            <legend className='flex-grow-1 pb-2'>{title} <small>({total})</small></legend>
            {
                isCrud && (
                    <div>
                        <button onClick={newRecordHandle} className='btn btn-sm btn-secondary text-nowrap'>
                            Crear nuevo Personaje
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ContentTitle; 