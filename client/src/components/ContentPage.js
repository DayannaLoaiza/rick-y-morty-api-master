import React from 'react';

import './css/ContentPage.css';

function ContentPage(props){
    return (
        <div className='ContentPage'>
            {props.children}
        </div>
    )
}

export default ContentPage;