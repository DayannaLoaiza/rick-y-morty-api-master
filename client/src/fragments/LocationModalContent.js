import React, {useState} from 'react';

import './css/LocationModalContent.css';

function LocationModalContent({reg}){
    const [editing, setEditing] = useState(false);
    return (
        <div className='LocationModalContent d-flex flex-row'>
            
            <div className='ml-2 mr-3'>
                
                <small>RESIDENTES</small>
                
                <div className='ImagesContainer'>
                    {reg.residents.map((ch, i) => {
                        let idCh = ch.split('/').slice(-1);
                        let src = `https://rickandmortyapi.com/api/character/avatar/${idCh}.jpeg`;
                        return <a key={i} target='_blank' href={ch}>
                                <img className='ModalMainImage pl-2 pr-2' src={src} />
                            </a>
                    })}
                </div>
            
            </div>

            <div className='Details pl-2 pr-2 pb-3'>
                {Object.keys(reg).map((k, i) => {
                    let value = '';
                    if(typeof reg[k] === 'object'){
                        value = JSON.stringify(reg[k]);
                    } else {
                        value = reg[k];
                    }
                    return (
                        <div className='mb-2' key={i}>
                            <small>{k.toUpperCase()}</small>
                            <div className='card'>
                                {editing ? (
                                    <input 
                                        type='text'
                                        className='form-control'
                                        defaultValue = {value}
                                    />
                                ) : (
                                    <div className='card-text p-1 pt-2 pb-2' style={{minHeight: '2.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace:'nowrap'}}>
                                        <big>
                                            {value}
                                        </big>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LocationModalContent;