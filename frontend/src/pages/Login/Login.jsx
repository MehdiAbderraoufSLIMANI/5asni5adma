import React from 'react'
import "./Login.css"
import {ReactComponent as UserLogo} from "../../resources/logos/user-solid.svg"
import {ReactComponent as LockLogo} from "../../resources/logos/lock-solid.svg"
import {Link} from "react-router-dom"

import { useEffect,  useState } from 'react'

import { client } from '../../App'

import { isLoggedIn } from '../../conctions/AuthCon'
 
import { useNavigate } from 'react-router-dom';
const Login = () => {
 

    const history = useNavigate();

    const checklogin = async () => {
      const loggedIn = await isLoggedIn();
      return loggedIn;
    };
  
    useEffect(() => {
      const redirectToHome = async () => {
        const loggedIn = await checklogin();
        if (loggedIn) {
          history('/');
       
         
        }
      };
  
      redirectToHome();
    }, [history]);

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
   const loginsubmition = (e) => {
    e.preventDefault();
    

    client.post('/api/login/', 
      {email: email,
      password: password})
      .then(response => {
        // Save the JWT token to local storage
        localStorage.setItem('accessToken', response.data.access);
        // Redirect to the dashboard or any other authenticated route
        window.location.href = '/';
        setError('')
      })
      .catch(error => {
           if (error.response && error.response.data && error.response.data.error) {
          
          setError(error.response.data.error);
        }
      });
  };


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
          <div  className="user-error" >
                  {error && <p>{error}</p>}
          </div>
        </div>
        <div className="rectangle"></div>
      </div>
    </div>
    
  )
}

export default Login
