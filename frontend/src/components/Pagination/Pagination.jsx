import React, {useEffect, useRef, useState} from 'react'
import './Pagination.css';
import { HashLink } from 'react-router-hash-link';



export default function Pagination({categ, nbPages, currentPage, setCurrentPage, showFilter}) {

   const numPage = useRef();

  
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

   const [page, setPage] = useState(1);
    const [isSelected, setIsSelected] = useState(false);
    
    useEffect(()=> {
        if(page < 1) {
          setCurrentPage(1);
        } else if(page > nbPages) {
          setCurrentPage(nbPages);
        } else {
          setCurrentPage(page);
        }    
        setIsSelected(false);    
    }, [page])

     
    useEffect(()=> {
      if(numPage.current.value.length===0 || numPage.current.value ==='')  {
        numPage.current.value = currentPage;
      } 
     }, [currentPage, page])
    
    
  
    return (
    <div className={`pagination-container ${showFilter ? 'adjustPagination': ''}`}>
        <HashLink smooth={true} to={categ ? `/services/${categ}#top` : '/services#top' }><i className="bi bi-arrow-left-circle-fill" onClick={prevPageHandler}></i></HashLink>
        <span>page </span>
        
           <input ref={numPage} className='current' type='number' min={1} max={nbPages} value={isSelected? page : currentPage} onChange={(e)=>{
            setIsSelected(true);
            setPage(e.target.value);
            
          }} /> <span> / {nbPages} </span>
        
        <HashLink smooth={true} to={categ ? `/services/${categ}#top` : '/services#top' }><i className="bi bi-arrow-right-circle-fill" onClick={nextPageHandler}></i></HashLink>
    </div>
  )
}
