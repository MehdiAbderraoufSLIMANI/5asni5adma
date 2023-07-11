import React, { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

export default function Navbar() {

 useEffect(()=> {
 console.log("render");
 }, [])
  /*Récupérer à partir de la table "anonce" toutes les categories existantes*/
  //testing
  const categories = ['Climatiseur', 'Menuisierie'];

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
      <a className="navbar-brand">
      <img src="../images/logo.png" alt="logo" width="130px" height="70px"/>
       </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 pageLinks"> {/* class = pageLinks */}
            <li className="nav-item">
              <NavLink to='/' className="nav-link">Acceuil</NavLink>
            </li>
        
            <li className="nav-item dropdown btn-group">  
               <button className="btn dropdown-toggle" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="true">
               <NavLink to='/services'> 
                Nos services   
                </NavLink> 
               </button>
                
              
              <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                {categories.map((categ => <li key={categ}><Link to={`/services/${categ}`} className="dropdown-item" >{categ}</Link></li> ))}
                {/*<li><Link to='/services/climatiseur' className="dropdown-item" >Climatiseur</Link></li>
                <li><Link to='services/menuisierie' className="dropdown-item">Menuisierie</Link></li> */}
            
                  <li><Link to='/services' className="dropdown-item">Tous les services</Link></li>
              </ul>
            </li>
            
            <li className="nav-item">
              <NavLink to='/FAQ' className="nav-link">FAQ</NavLink>
            </li>

            <li className="nav-item">
              <HashLink to='/#contact' className="nav-link ">Nous Contacter</HashLink>
            </li>
   </ul>
   <ul className="navbar-nav  mb-2 mb-lg-0 pushRight"  >
            <li className="nav-item redBtn">
              <Link to='/inscription' className="nav-link ">Rejoigner nous</Link>
            </li>

            <li className="nav-item redBtn">
              <Link to='/connection' className="nav-link ">Se connecter</Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>

  )
}
