import React from 'react';

import './css/Content.css';

function Content(props){
    return (
        <div className='Content container-fluid'>
            {props.children}
        </div>
    )
}

export default Content;