import React from 'react'
import "./Login.css"
import {ReactComponent as UserLogo} from "../../resources/logos/user-solid.svg"
import {ReactComponent as LockLogo} from "../../resources/logos/lock-solid.svg"
import {Link} from "react-router-dom"

import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


const Login = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logedin, setlogedin] = useState(false);
  const loginsubmition = (e) => {
    e.preventDefault();
 
      client.post('/api/login/', 
        {email: email,
        password: password,}  )
      .then(response => {
        setlogedin(true)
        console.log('Registration successful:', logedin);
       
      })
      .catch(error => {
        console.error('Registration failed:', logedin);
      
      });

   }
  

  return (
    <div className="container">
      <div className='login-form'>
        <div className="login-content">
          <div className="login">
            <p>Connexion</p>
            <div className="line"></div>
          </div>
          <form className="user-info"  onSubmit={(e)=>loginsubmition(e)}>
            <div className="input-box">
              <UserLogo className="icon"/>
              <input type="email" className='email-input' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <label>Email</label>
            </div>
            <div className="input-box">
              <LockLogo className="icon"/>
              <input type="password" className='password-input' required  value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <label>Mot de passe</label>
            </div>
            <div className="btn-submit">
              <button type='submit' className='btn-login'>Connexion</button>
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
}

export default Login
