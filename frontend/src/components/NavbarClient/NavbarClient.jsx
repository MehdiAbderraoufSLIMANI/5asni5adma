import React, { useEffect, useState, useContext } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { motion } from 'framer-motion';
import logo from '../../resources/images/logo.png';
import defaultPic from '../../resources/images/user.png'
import AuthContext from '../../conctions/AuthContext';
import './NavbarClient.css'

export default function NavbarClient() {
  /*Backend
Récupérer à partir de la table "anonce" toutes les categories existantes*/
  //testing
  const categories = ['Photography', 'Fashion & Style']   //['Climatiseur', 'Menuisierie'];



  let { isLoggedIn, logoutUser, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const sampleLocation = useLocation();

  useEffect(() => {
    sampleLocation.pathname.includes('/services') ? setIsActive(true) : setIsActive(false);
  }, [sampleLocation])

  if(isLoggedIn() && user && user.account_type=='client')   //account_type = 'worker' || 'client'
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid" style={{ paddingBottom: '0px' }}>
        <a className="navbar-brand"  >
          <img src={logo} alt="logo" width="130px" height="70px" />
        </a>
        <div className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
          </svg></span>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 pageLinks">
            <li className="nav-item">
              <NavLink to='/' className="nav-link">Accueil </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a href='#' onClick={() => setShowDropdown(!showDropdown)} className={`nav-link dropdown-toggle ${isActive ? 'active' : ''}`}>
                Nos services
              </a>
              {showDropdown && <ul className="dropdown-menu" onMouseLeave={() => setShowDropdown(false)}>
                {categories.map((categ => <li key={categ}><Link to={`/services/${categ}`} onClick={() => setShowDropdown(false)} className="dropdown-item" >{categ}</Link></li>))}
                <li><Link to='/services' onClick={() => setShowDropdown(false)} className="dropdown-item" >Tous les services</Link></li>
              </ul>}
            </li>

            <li className="nav-item">
              <NavLink to='/FAQ' className="nav-link">FAQ</NavLink>
            </li>

            <li className="nav-item">
              <HashLink to='/#contact' smooth={true} className="nav-link">Nous Contacter</HashLink>
            </li>


          </ul>


          
          <ul className="navbar-nav  mb-2 mb-lg-0  user-dropdown"  >
            <li className="nav-item dropdown">
              <a href='#' onClick={() => setShowDropdown2(!showDropdown2)} className='nav-link '>
                <img  src={(user && user.pic) ? user.pic : defaultPic } alt='pic'/>
              </a>
              {showDropdown2 && <ul className="dropdown-menu" onMouseLeave={() => setShowDropdown2(false)}>
                <li><Link to='/profil/client' onClick={() => setShowDropdown2(false)} className="dropdown-item" >Mon profil</Link></li>
                <li><Link to='/inbox/client' onClick={() => setShowDropdown2(false)} className="dropdown-item" >Boite de reception</Link></li>
                <li><Link to='' 
                onClick={() => 
                {logoutUser();
                setShowDropdown2(false)
                }} className="dropdown-item" >Deconnection</Link></li>
              </ul>}
            </li>
          </ul>

          <ul className='navbar-nav  mb-2 mb-lg-0  user-links'>
                <li className="nav-item">
                  <NavLink to='/profil/client' className="nav-link" >Mon profil</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/inbox/client' className="nav-link" >Boite de reception</NavLink>
                </li>
                <li className="nav-item">
                  <Link to='' onClick={() => logoutUser()} className="nav-link" >Deconnection</Link>
                </li>
          </ul>


        </div>
      </div>
    </nav>
  )

  else return null;
}
