import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import logo from '../resources/images/logo.png';


export default function Footer() {
    const sampleLocation = useLocation();

    //*********************************************************************************** */
  const withoutNavFooterRoutes = ["/connection" , "/inscription", "/register-worker","/register-client","/chat"];
  ///******************************************************************************* */

  if (withoutNavFooterRoutes.some((item) => sampleLocation.pathname === item))   return null;
  return (
    <div className="footer-container">
    <div className="footer-top">
        <img src={logo} height='120px' width='150px' alt='logo' />
        <p className='display-6'>5asni 5adam</p>
    </div>
    <div className="footer-content container-fluid mt-5">
        <div className="row justify-content-evenly align-items-center">
            <div className="col-md-4">
                <p><Link to='/about us'>Qui sômmes-nous ?</Link></p>
                <p><Link to='/FAQ'>Les questions les plus fréquentes</Link></p>
            </div>

            <div className="col-md-4 align-self-start">
                <p><HashLink to='/services#top'>Nos services</HashLink></p>
            </div>

            <div className="col-md-4">
                <p>Suivez nous</p>
                <a href="https://fr-fr.facebook.com/"><i className="bi bi-facebook me-3"></i></a>
                <a href="https://www.instagram.com/"><i className="bi bi-instagram"></i></a>
            </div>
        </div>
    </div>
    <p className='copyRight text-center mt-5'>&copy; Copyright 2023 All Rights Reserved </p>
    </div>
  )
}
