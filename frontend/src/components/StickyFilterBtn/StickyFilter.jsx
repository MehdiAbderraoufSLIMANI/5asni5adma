import React from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import './StickyFilter.css';

export default function StickyFilter({showStickyFilter,setShowFilter, setShowStickyFilter}) {
  
  
  return (
    <AnimatePresence>
    { showStickyFilter && 
    <motion.div key='sticky'
    initial={{opacity: 0, y: 30, scale: 0.5   }}
    animate={{opacity: 1, y: 0 , scale: 1, rotate: 360  }}
    exit={{opacity: 0 , scale: 0.5}}
    transition={ {duration: 1, type: 'spring'}}

    className='sticky-container'>

       <button onClick={()=> {
        setShowFilter(true);
        setShowStickyFilter(false);
        } } className='btn'>Filtrer <i className="bi bi-filter"></i></button>

    </motion.div>
}
    </AnimatePresence>
  )
}
