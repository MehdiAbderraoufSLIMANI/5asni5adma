import React, {useEffect, useState } from 'react'
import { NavLink,Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { motion } from 'framer-motion'; 
import logo from '../resources/images/logo.png';


import   {useContext} from 'react' 
 
import AuthContext from '../conctions/AuthContext';

export default function Navbar() {

  
  let {isLoggedIn,logoutUser,user} = useContext(AuthContext)

 
  
  const handleLogout = () => {
    logoutUser()
     
  };

/*Backend
Récupérer à partir de la table "anonce" toutes les categories existantes*/
  //testing
  const categories = ['Climatiseur', 'Menuisierie'];
 

  

  const [showDropdown, setShowDropdown] = useState(false);
  const [isActive, setIsActive] = useState(false);



  const sampleLocation = useLocation();

  useEffect(()=> {
    sampleLocation.pathname.includes('/services') ? setIsActive(true) : setIsActive(false);
  }, [sampleLocation])


  //*********************************************************************************** */
  const withoutNavFooterRoutes = ["/connection" , "/inscription", "/register-worker","/register-client"];
  ///******************************************************************************* */

  if (withoutNavFooterRoutes.some((item) => sampleLocation.pathname === item))   return null;

  return(
    <nav className="navbar navbar-expand-xl ">
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
              <NavLink to='/' className="nav-link">Acceuil</NavLink>
            </li>

            <li className="nav-item dropdown">
              <a href='#' onClick={() => setShowDropdown(!showDropdown)} className={`nav-link dropdown-toggle ${isActive? 'active' :''}`}>
                Nos services
              </a>
              {showDropdown && <ul className="dropdown-menu" onMouseLeave={() => setShowDropdown(false)}>
              { categories.map((categ => <li key={categ}><Link to={`/services/${categ}`} onClick={()=>setShowDropdown(false)}  className="dropdown-item" >{categ}</Link></li>))}
                <li><Link to='/services' onClick={()=>setShowDropdown(false)} className="dropdown-item" >Tous les services</Link></li>
              </ul>}
            </li>

            <li className="nav-item">
              <NavLink to='/FAQ' className="nav-link">FAQ</NavLink>
            </li>

            <li className="nav-item">
              <HashLink to='/#contact' smooth={true}  className="nav-link ">Nous Contacter</HashLink>  {/* scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} */}
            </li>


          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0 pushRight"  >

            
          {isLoggedIn() ? (
              <div></div>
            ) : (
              // Render this link if the user is not logged in
               

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
            )}
            

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
              {isLoggedIn() ? (
                <div>
            <Link to='/connection' onClick={handleLogout}  className="nav-link">Déconnecté</Link>
 
         
            </div>

          ) : (
            // Render this link if the user is not logged in
            <Link to='/connection' className="nav-link ">Se connecter</Link>
          )}
              
            </motion.li> 

            {isLoggedIn && user &&(
              <Link to='/' >
              <motion.img
                src={user.pic || logo} 
                style={{
                  width: '50px', // Adjust this value to set the desired width
                  height: '50px', // Adjust this value to set the desired height
                  borderRadius: '50%', // To make it a circular image like Facebook logo
                }}
                initial={{ opacity: 0, scale: 1 }} // Initial opacity and scale when loading
                animate={{ opacity: 1, scale: 1 }} // Animation to full opacity and scale
                transition={{ duration: 1 }} // Animation duration
              />

              </Link>

              )}
     
             
          </ul>

        </div>
      </div>
    </nav>

  ) 
          
  
}
