import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Inscription.css"

const Inscription = () => {
  const navigate = useNavigate()


  return (
    <div className="inscription-container">
      <div className='inscription-form'>
      <div className="register-content">
          <div className="inscription">
            <p>Inscription</p>
            <div className="line"></div>
          </div>
          <div className="content">
            <div className="text">
              <p>Rejoignez-nous en tant que:</p>
            </div>
            <button className='client-btn' onClick={()=> navigate('/register-client')}><p>Je suis client</p></button>
            <button className='worker-btn' onClick={()=> navigate('/register-worker')}><p>Je suis artisans</p></button>
          </div>
        </div>
      <div className="rectangle"></div>
      </div>
    </div>
  )
  
}

export default Inscription