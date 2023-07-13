import React, { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { motion } from 'framer-motion';

export default function Navbar() {

  useEffect(() => {
    console.log("render");
  }, [])
  /*Récupérer à partir de la table "anonce" toutes les categories existantes*/
  //testing
  const categories = ['Climatiseur', 'Menuisierie'];

  return (
    <nav className="navbar navbar-expand-xl "> 
      <div className="container-fluid" style={{paddingBottom: '0px'}}>
        <a className="navbar-brand">
          <img src="../images/logo.png" alt="logo" width="130px" height="70px" />
        </a>
        <div className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
          </svg></span>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 pageLinks">
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
                { categories.map((categ => <li key={categ}><Link to={`/services/${categ}`} className="dropdown-item" >{categ}</Link></li>))}
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
            <motion.li className="nav-item redBtn"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#F5432A",
                transition: ".8s ease-in-out"
              }}
              whileTap={{
                scale: 1
              }}
            >
              <Link to='/inscription' className="nav-link ">Rejoigner nous</Link>
            </motion.li>

            <motion.li className="nav-item redBtn"
              whileHover={{
                scale: 1.1,
                backgroundColor: "#F5432A",
                transition: ".8s ease-in-out"
              }}
              whileTap={{
                scale: 1
              }}
            >
              <Link to='/connection' className="nav-link ">Se connecter</Link>
            </motion.li>
          </ul>

        </div>
      </div>
    </nav>

  )
}
