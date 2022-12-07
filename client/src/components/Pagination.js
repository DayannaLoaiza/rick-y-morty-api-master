import React from 'react';

function Pagination({current, info, pagingHandle}) {

    let pages = Array(info.pages || 1).fill('').map((_,i) => i+1);
    
    let pFrom = current - 3;
    if(pFrom < 1) pFrom = 1;

    let pTo = current + 3;
    if(pTo > info.pages) pTo = info.pages;

    pages = pages.filter(p => p >= pFrom && p <= pTo);

    return (
        <nav aria-label="Page navigation">
            <ul className="mt-4 pagination pagination-sm justify-content-center">
                <li className="page-item">
                    <a onClick={()=>pagingHandle(current - 1)} className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {
                    pages.map((page, i) => {
                        // TODO, seleccionar página actual
                        let pageActive = page == current ? 'active' : '';
                        return <li key={i+1} className={`page-item ${pageActive}`}>
                            <a onClick={()=>pagingHandle(page)} className="page-link">{page}</a>
                        </li>
                    })
                }
                <li className="page-item">
                    <a onClick={()=>pagingHandle(current + 1)} className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;