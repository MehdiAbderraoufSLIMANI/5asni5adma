import React, {useState, useEffect} from 'react'
import {animateScroll as scroll} from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import './GoTop.css';

export default function GoTop({scrollRate}) {
  
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        if(scrollRate > 65) {
          setShowTopBtn(true);
        } else {
          setShowTopBtn(false);
        }  
      }, [scrollRate])

    const scrollToTopHandler = () => {
        scroll.scrollToTop({
          duration: 400,
          smooth: true, // Enable smooth scrolling
        });
    };
  
    return (
    <>
     <AnimatePresence>
        {showTopBtn && 
        <motion.button key='top' 
        initial={{opacity: 0, y: 50  }}
        animate={{opacity: 1, y: 0 }}
        exit={{opacity: 0 , y: -10 }}
        transition={ {duration: 1, type: 'spring'}}

        className='top' 
        onClick={scrollToTopHandler}> <i className="bi bi-chevron-up"></i></motion.button> }
      
      </AnimatePresence>
    </>
  )
}
