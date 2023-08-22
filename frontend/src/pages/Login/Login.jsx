import "./Login.css"
import {ReactComponent as UserLogo} from "../../resources/logos/user-solid.svg"
import {ReactComponent as LockLogo} from "../../resources/logos/lock-solid.svg"
import {Link} from "react-router-dom"

import { motion } from "framer-motion"
 
 
import React, {useContext, useState} from 'react'

import AuthContext  from '../../conctions/AuthContext'
const Login = () => {
    
    let {loginUser} = useContext(AuthContext)
    let [isInputEmpty, setIsInputEmpty] = useState(true)

    const handleChange = (e) => {
      e.preventDefault()

      if(e.target.value !== ''){
        setIsInputEmpty(false)
      }else{
        setIsInputEmpty(true)
      }

    }





    const [isLoading, setIsLoading] = useState(false);
    const [isEmailFilled, setIsEmailFilled] = useState(false); 
  const handleLogin = (e) => {
    e.preventDefault();

     
      setIsLoading(true); 
      const er = loginUser(e);
      if (er != 200){
        setIsLoading(false); 
      }
     
  };
  const handlemailChange = (e) => {
    setIsEmailFilled(e.target.value.trim() !== ''); // Check if the input has any value (ignoring leading/trailing spaces)
  };
  return (
    <div className="login-container">
      <div className='login-form'>
        <div className="login-content">
          <div className="login">
            <p>Connexion</p>
            <div className="line"></div>
          </div>


          <form className="user-info" onSubmit={handleLogin}>
            <div className={`input-box ${isEmailFilled ? 'filled' : ''}`}>
              <UserLogo className="icon"/>
              <input type="email" onChange={handlemailChange} className='email-input' required name="email" />
              <label className={!isInputEmpty? 'email-label-clicked' : ''}>Email</label>
            </div>
            <div className="input-box">
              <LockLogo className="icon"/>
              <input type="password" className='password-input' required name="password"/>
              <label>Mot de passe</label>
            </div>
            <div className="btn-submit">
            <motion.button
            disabled={isLoading}
            style={{ cursor: isLoading ? 'wait' : 'pointer' }}
            whileHover={!isLoading ? { scale: 1.1 } : {}}
            whileTap={!isLoading ? { scale: 0.9 } : {}}
            type="submit"
            className="btn-login"
          >
            {isLoading ? 'attendez...' : 'Connexion'}
          </motion.button>
            </div>
            <div className="buttons">
              <p>Mot de passe oublié.<Link className="cliquer-ici">cliquer ici</Link></p>
              <Link className='btn-register' to="/inscription">
                <span>Créer un compte</span>
              </Link>
            </div>
          </form>
          

        </div>
        <div className="rectangle"></div>
      </div>
    </div>
    
  )

  /*
  
            <div  className="user-error" >
                  {error && <p>{error}</p>}
          </div>

  */ 
}

export default Login
