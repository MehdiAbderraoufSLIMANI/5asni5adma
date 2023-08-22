import React, { createContext, useEffect, useState } from 'react'

export const filterCtx = createContext();

export default function FilterContext(props) {
  
  const [categorie, setCategorie] = useState('catégorie');
  const [wilaya, setWilaya] = useState('wilaya');
  const [commune, setCommune] = useState('commune');
  

   
    return (
    <filterCtx.Provider value={{categorie,setCategorie,wilaya,setWilaya,commune,setCommune}}>
        {props.children}
    </filterCtx.Provider>
  )
}
