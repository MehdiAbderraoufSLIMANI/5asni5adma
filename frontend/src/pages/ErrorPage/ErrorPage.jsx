import React from 'react'
import './ErrorPage.css';
import error from '../../resources/images/error.png';


export default function ErrorPage() {

  
 
  return (
    <div className='error-container'>
      <div className="error-content">
        <h1>OOPS !</h1>
        <img src={error} height="350px" width="85%" alt="" />
        <h3>Page introuvable</h3>
        <p>La page que vous cherchez n'existe pas, a été déplacée ou est temporairement injoignable. 
          Veuillez vérifier l'URL saisie et réessayer ultérieurement.</p> 
      </div>
    </div>
  )
}
