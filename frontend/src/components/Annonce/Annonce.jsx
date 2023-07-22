import React from 'react'
import StarRating from '../StarRating';
import { Link } from 'react-router-dom';
import './Annonce.css';

export default function Annonce({ ann }) {
  return (
    <div className="col-md-5 col-lg-3 annonce-container">
      <img src={ann.img} height='55%' width='100%' />
      <h4> {ann.service} </h4>
      <StarRating rating={ann.rating} />
      <p>Catégorie: {ann.categorie} </p>
      <i className="bi bi-geo-alt-fill"></i> <span>{ann.commune}, {ann.wilaya} </span>
      
      
        <Link to={`/service/${ann.num}/${ann.id_artisan}`} className='btn'>Détails</Link>
      
    </div>
  )
}
