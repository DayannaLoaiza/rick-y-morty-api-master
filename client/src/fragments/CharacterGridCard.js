import React from 'react';
import { Link } from 'react-router-dom';

import './css/CharacterGridCard.css';

function CharacterGridCard({reg, clickCardHandle}){
    let statusColor = reg.status === 'Alive' ? 'text-success' :
                      reg.status === 'Dead' ? 'text-danger' : 'text-muted';
    return (
        <div className='CharacterGridCard card'>
            <a target='_blank' onClick={()=>clickCardHandle(reg)} no_href={`http://localhost:7000/characters/${reg.id}`}>
                <div 
                    className="CardImage"
                    style={{backgroundImage: `url(${reg.image})`}} 
                ></div>
            </a>
            <div className="CardDetails">
                    <div className="fw-bold mb-1">
                        <a target='_blank' href={`http://localhost:7000/characters/${reg.id}`}>
                            {reg.name}
                        </a>
                    </div>
                    <div><span className={`pr-2 ${statusColor}`}>●</span>{reg.status} - {reg.species}</div>
                    <small className='text-muted'>Última ubicación conocida</small><br/>
                    <div>
                    { reg.location.hasOwnProperty('url') ? (
                        <a target='_blank' href={`http://localhost:7000/locations/${reg.location.url.split('/').slice(-1)}`}>
                            {reg.location.name}
                        </a>
                    ):(
                        <span>{reg.location}</span>
                    )} 
                    </div>
            </div>
        </div>
    )
}

export default CharacterGridCard;