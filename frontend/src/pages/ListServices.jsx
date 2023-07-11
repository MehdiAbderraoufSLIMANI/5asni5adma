import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ListServices() {

    const {categorie} = useParams();
   //getting all data (toutes les annonces)
    useEffect(() => {
        if(categorie) {
            //filtering services that concerns "categorie"
            console.log("filtering services that concerns",categorie);
        } else {
            //displaying all data 
          console.log("toutes les annonces");
        }
    }, [categorie])
  
    return (
    <div>
      <h1>services page of {categorie? categorie : 'all'}</h1>
    </div>
  )
}
