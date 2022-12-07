import React, {useEffect, useState} from 'react';

import './css/EpisodeModalContent.css';

function EpisodeModalContent({reg}){
    const [editing, setEditing] = useState(false);
    const [fullReg, setFullReg] = useState({});

    useEffect( async () => {
        setFullReg(reg);
    }, [reg]);

    return (
        <div className='EpisodeModalContent d-flex flex-row'>

            <div className='ml-2 mr-3'>
            
                <small>PERSONAJES</small>
            
                <div className='ImagesContainer'>
                    {reg.characters.map((ch, i) => {
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
                                    <div className='ReadonlyControl card-text p-1 pt-2 pb-2'>
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

export default EpisodeModalContent;