import React from 'react';

import './css/MenuBar.css';

function MenuBar({title}){
    return (
        <nav className="MenuBar navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <legend className="text-white mb-0">
                    {title}
                </legend>
            </div>
        </nav>
    )
}

export default MenuBar;