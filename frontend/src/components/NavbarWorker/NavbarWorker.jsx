import React, { useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import logo from '../../resources/images/logo.png';
import defaultPic from '../../resources/images/user.png'
import AuthContext from '../../conctions/AuthContext';
import './NavbarWorker.css'

export default function NavbarWorker() {


    let { isLoggedIn, logoutUser, user } = useContext(AuthContext);
    const [showDropdown2, setShowDropdown2] = useState(false);


    if(isLoggedIn() && user && user.account_type=='worker')   //account_type = 'worker' || 'client'
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

                    <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0 pageLinksWorker" >
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link">Accueil </NavLink>
                        </li>


                        <li className="nav-item">
                            <NavLink to='/FAQ' className="nav-link">FAQ</NavLink>
                        </li>

                        <li className="nav-item">
                            <HashLink to='/#contact' smooth={true} className="nav-link">Contact</HashLink>
                        </li>

                    </ul>



                    <ul className="navbar-nav  mb-2 mb-lg-0  user-dropdown"  >
                        <li className="nav-item dropdown">
                            <a href='#' onClick={() => setShowDropdown2(!showDropdown2)} className='nav-link'>
                                <img src={(user && user.pic) ? user.pic : defaultPic} alt='pic' />
                            </a>
                            {showDropdown2 &&
                                <ul className="dropdown-menu container" onMouseLeave={() => setShowDropdown2(false)}>

                                    <div className="dropdown-icons">
                                        <i className="bi bi-person-lines-fill me-3"></i>
                                        <i className="bi bi-envelope-fill me-3"></i>
                                        <i className="bi bi-box-arrow-right me-3"></i>
                                    </div>

                                    <div className='worker-dropdown-menu'>
                                        <li><Link to='/profil/worker' onClick={() => setShowDropdown2(false)} className="dropdown-item">Mon profil</Link></li>
                                        <li><Link to='/inbox/worker' onClick={() => setShowDropdown2(false)} className="dropdown-item" > Boite de reception</Link></li>
                                        <li><Link to=''
                                            onClick={() => {
                                                logoutUser();
                                                setShowDropdown2(false)
                                            }} className="dropdown-item logout">Deconnection</Link></li>
                                    </div>
                                </ul>}
                        </li>
                    </ul>

                    <ul className='navbar-nav  mb-2 mb-lg-0  user-links  me-auto ms-auto'>
                        <li className="nav-item">
                            <NavLink to='/profil/worker' className="nav-link" >Mon profil</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/inbox/worker' className="nav-link" >Boite de reception</NavLink>
                        </li>
                        <li className="nav-item">
                            <Link to='' onClick={() => logoutUser()} className="nav-link logout ms-auto" >Deconnection</Link>
                        </li>
                    </ul>


                </div>
            </div>
        </nav>
    )

    else return null;
}
