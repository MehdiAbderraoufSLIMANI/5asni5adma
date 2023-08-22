import React, {useEffect, useState} from 'react'
import './Pagination.css';
import { HashLink } from 'react-router-hash-link';



export default function Pagination({categ, nbPages, currentPage, setCurrentPage, showFilter}) {

    const prevPageHandler = () => {
      if(currentPage > 1) {
        setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
      } else {
        setCurrentPage(1);
      }
    }
    
    const nextPageHandler = () => {
      if(currentPage < nbPages) {
        setCurrentPage(prevCurrentPage=> parseInt(prevCurrentPage) + 1); //parseInt(currentPage)
      } else {
        setCurrentPage(nbPages);
      }
    }
   
  
    return (
    <div className={`pagination-container ${showFilter ? 'adjustPagination': ''}`}>
        {currentPage > 1 && <HashLink smooth={true} to={categ ? `/services/${categ}#top` : '/services#top' }><i className="bi bi-arrow-left-circle-fill" onClick={prevPageHandler}></i></HashLink>}
        <span>page </span>
        
           <input disabled className='current' type='number' value={currentPage} /> 
           <span> / {nbPages} </span>
        
       {currentPage < nbPages && <HashLink smooth={true} to={categ ? `/services/${categ}#top` : '/services#top' }><i className="bi bi-arrow-right-circle-fill" onClick={nextPageHandler}></i></HashLink>}
    </div>
  )
}
