import React from 'react'
import StarRating from '../StarRating';
import { Link } from 'react-router-dom';
import './Annonce.css';

export default function Annonce({ ann }) {
  return (

    <div className="col-md-5 col-lg-3 annonce-container">
      <Link to={`/service/${ann.num}/${ann.id_artisan}`}>
        <img src={"http://127.0.0.1:8000/media/"+ann.img} height='330px' width='100%' />  
        <h4> {ann.service} </h4>
      </Link>

        <StarRating rating={ann.rating} />
        <p>Catégorie: {ann.categorie} </p>
        <i className="bi bi-geo-alt-fill"></i> <span>{ann.commune}, {ann.wilaya} </span>      
    </div>

  )
}
