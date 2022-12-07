import React from 'react';
import { Link } from 'react-router-dom';

import './css/EpisodeGridCard.css';

function EpisodeGridCard({reg, clickCardHandle}){
    return (
        <div className='EpisodeGridCard card'>
            <a target='_blank' onClick={()=>clickCardHandle(reg)} no_href={`http://localhost:7000/episodes/${reg.id}`}>
            <div>
                {reg.starring.map((ch, i) => {
                    return <img className='CardImage' key={i} src={ch} />
                })}
            </div>
            </a>
            <div className="CardDetails">
                    <div className="fw-bold mb-1">
                        <a target='_blank' href={`http://localhost:7000/episodes/${reg.id}`}>
                            {reg.name}
                        </a>
                    </div>
                    <div>{reg.episode}</div>
                    <div>
                        <small className='text-muted'>Fecha de emisión</small><br/>
                        {reg.air_date}
                    </div>
            </div>
        </div>
    )
}

export default EpisodeGridCard;