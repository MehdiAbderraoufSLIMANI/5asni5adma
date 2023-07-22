import React from 'react'
import { useParams } from 'react-router-dom'

export default function ConsulterService() {
  const {numAnn, idArtisan} = useParams();
  
  return (
    <div>
      <h1>consulter le service num {numAnn} de la'artisan {idArtisan} </h1>
    </div>
  )
}
