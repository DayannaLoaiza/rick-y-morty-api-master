import React from 'react';

import './css/ContentBody.css';

function ContentBody(props){
    return (
        <div className='ContentBody container-fluid'>
            {props.children}
        </div>
    )
}

export default ContentBody;