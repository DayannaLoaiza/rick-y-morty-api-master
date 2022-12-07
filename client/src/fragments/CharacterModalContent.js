import React, { useState, useRef } from 'react';

import './css/CharacterModalContent.css';

function CharacterModalContent({ reg, isWritable, isNew }) {

    const [editing, setEditing] = useState(isWritable);
    const [imgSrc, setImageSrc] = useState('https://rickandmortyapi.com/api/character/avatar/19.jpeg');

    const refImage = useRef(null);
    const refHiddenImage = useRef(null);

    if (isNew) {
        let newReg = {};
        Object.keys(reg).forEach(key => {
            if (key == 'image') {
                newReg[key] = imgSrc
            } else {
                if (key !== 'id') {
                    newReg[key] = '';
                }
            }
        });
        reg = newReg;
    }

    function imageClickHandle() {
        refImage.current.click();
    }

    function imageLoadHandle(evt) {
        let tgt = evt.target,
            files = tgt.files
        ;

        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                setImageSrc(fr.result);
                refHiddenImage.current.setAttribute('value', fr.result);
            }
            fr.readAsDataURL(files[0]);
        }else {
            console.log('ERROR');
        }
    }

    return (
        <div className='CharacterModalContent d-flex flex-row'>

            <div className='pl-2 pr-2'>
                <small>IMAGEN</small>
                <img onClick={imageClickHandle} className='ModalMainImage' src={reg.image} />
                <input ref={refImage} onChange={imageLoadHandle} className='d-none' type='file' name='imageFile' />
            </div>

            <div className='Details pl-3 pr-2 pb-3'>
                <form id={isNew ? 'newCharacterCrudForm' : 'characterCrudForm'}>

                    {Object.keys(reg).map((k, i) => {

                        let value = '';

                        if (typeof reg[k] === 'object') {
                            value = JSON.stringify(reg[k]);
                        } else {
                            value = reg[k];
                        }

                        let hideField = false;
                        let inputType = 'text';

                        if(k==='id'){
                            inputType = 'hidden';
                            hideField = true;
                        }

                        return (
                            <div className='mb-2' key={i}>
                                {
                                    k == 'image' ? (
                                        <input
                                            ref={refHiddenImage}
                                            name='image'
                                            type='hidden'
                                            defaultValue={reg.image}
                                        />
                                    ) : (
                                        <>
                                            {
                                                !hideField && <small>{k.toUpperCase()}</small>
                                            }
                                            
                                            <div className='card'>
                                                {editing ? (
                                                    <input
                                                        name={k}
                                                        type={inputType}
                                                        className='form-control'
                                                        defaultValue={value}
                                                    />
                                                ) : (
                                                        <div className='ReadonlyControl card-text p-1 pt-2 pb-2'>
                                                            {value}
                                                        </div>
                                                    )}
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        )
                    })}
                </form>
            </div>
        </div>
    )
}

export default CharacterModalContent;