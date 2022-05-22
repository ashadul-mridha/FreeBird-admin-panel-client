import React from 'react';

const Pagination = ({ dataPerPage , totalData, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
            <li className={currentPage == 1 ? "page-item disabled" : "page-item"}>
                <a className="page-link" onClick={() => paginate(currentPage - 1)} >Previous</a>
            </li>
                {pageNumbers.map(number => (
                <li key={number}  className={ currentPage === number ? 'page-item active' : 'page-item'}>
                    <a onClick={() => paginate(number)}  className='page-link'>
                    {number}
                    </a>
                </li>
                ))}
                
            <li className={ pageNumbers[pageNumbers.length - 1] === currentPage ? "page-item disabled" : "page-item"}>
                <a className="page-link" onClick={() => paginate(currentPage + 1)} >Next</a>
            </li>
      </ul>
    </nav>
  );
};

export default Pagination;
