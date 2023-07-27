import React, { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import './Acceuil.css';
import logo from '../../resources/images/logo.png';
import acceuil from '../../resources/images/acceuil.png';
import assistance from '../../resources/images/assistance.png';
import tarif from '../../resources/images/tarif.png';
import satisfaction from '../../resources/images/satisfaction.png';
 
import { client } from '../../App'
 

export default function Acceuil() {


 const [fullname, setFullname] = useState('');
 const [userEmail, setUserEmail] = useState('');
 const [message, setMessage] = useState('');
 



 const contactSubmitHandler = (e) => {
  e.preventDefault();

  const jsondata = {
    fullname: fullname,
    userEmail: userEmail,
    message: message,

  }

  client.post('/api/contectus/',jsondata)
  .catch(error => {
    console.error('Registration failed:', error);
     
  });
  setFullname('');
  setUserEmail('');
  setMessage(''); 
 }
 


  const el = useRef();
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Plombiers', 'Electriciens', 'Peintres', 'Ferroniers', 'et encore plus...'],
      typeSpeed: 25,
      backSpeed: 25,
      loop: true
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []); 
   





  return (
    <div>
      <div className="acceuil-intro container-fluid">
        <div className="row justify-content-evenly align-items-center">
          <div className="col-md-6">
            <h1>Meilleur Site Web En Algérie Qui Vous Rapproche Des Artisans : </h1>
            <span className='typedAnim' ref={el}></span>
            <p style={{marginTop: '24px'}}>On vous propose plusieurs artisans algériens avec une variété de domaines, uniquement pour vous.</p>
          </div>
          <div className="col-md-6">
            <img src={acceuil} alt="artisans" height='130%' width='120%' />
          </div>
        </div>
      </div>

      <div className="guarantee container-fluid text-center">
        <h2 >On Vous Guarantie </h2>
        <div className="row justify-content-around align-items-center">

          <motion.div className="col-md-3 feature-container"
          initial={{ 
            y: 300,
            opacity: 0.5}}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              bounce: 0.4,
              duration: 0.7 
            }
          }}
          viewport={{once: true}}
          
          >
            <div className="img-container ">
              <img src={satisfaction} alt="feature" height='100%' width='100%' />
            </div>
            <p>100% satisfaction</p>
          </motion.div>

          <motion.div className="col-md-3 feature-container"
          initial={{ 
            y: 300,
            opacity: 0.5}}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              bounce: 0.4,
              duration: 1.5 
            }
          }}
          viewport={{once: true}}
          >
            <div className="img-container">
              <img src={tarif} alt="feature" height='100%' width='100%' />
            </div>
            <p>Meilleurs tarifs</p>
          </motion.div>

          <motion.div className="col-md-3 feature-container mt-4"
          initial={{ 
            y: 300,
            opacity: 0.5}}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              bounce: 0.4,
              duration: 2.3 
            }
          }}
          viewport={{once: true}}
          >
            <div className="img-container">
              <img src={assistance} alt="feature" height='100%' width='100%' />
            </div>
            <p>Assistance et disponibilité</p>
          </motion.div>
          
        </div>
      </div>

      <div id='contact'  className='container-fluid text-light'>  
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 contact-form">
            <h1 className='display-4'>Nous contacter</h1>
            <p className='mb-5'>Envoyer un message</p>

            <form onSubmit={(e)=>contactSubmitHandler(e)}>
              <div className="mb-4">
                <input type="text" className="form-control" placeholder='Nom complet' value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
              </div>

              <div className="mb-4">
                <input type="email" className="form-control" placeholder='Votre email' value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} />
              </div>

              <div className="mb-5">
                <textarea placeholder="Entrez votre message ici..." className="form-control" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
              </div>

              <button type="submit" className="btn envoyerMsg">Envoyer</button>
            </form>


          </div>

          <div className="col-md-4 info-contact">
            <div className="img-container">
              <img src={logo} alt="logo" height='120%' width='100%' />
            </div>
            <div className="coord mt-4">
              <div className='mb-2'>
              <i className="bi bi-telephone-fill  me-2"></i><span>+213 xxx xxx</span>   
              </div>
             
            <div>
            <i className="bi bi-envelope me-2"></i><span>5asni5adam@gmail.com</span>
            </div>
            
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
