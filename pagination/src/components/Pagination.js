import React from 'react';

const Pagination = ({ usersPerPage, totalUsers, changePage, currentPage, paginate, theme }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i)
    }

    let button
    if (theme === 'dark-theme') {
        button = "darkButton"
    } else {
        button = 'button'
    }
    console.log(button)

    return (
        <div className='paginateContainer'>
            <button className="prev" onClick={(event) => changePage(event, pageNumbers.length)}>Prev</button>
            {
                pageNumbers.map(number => (
                    <button
                        key={number}
                        className={`${button} ${number === currentPage ? 'activeButton' : ''}`}
                        onClick={() => paginate(number)}>
                        {number}
                    </button>
                ))
            }
            <button className="next" onClick={(event) => changePage(event, pageNumbers.length)}>Next</button>
        </div >
    );
};

export default Pagination;