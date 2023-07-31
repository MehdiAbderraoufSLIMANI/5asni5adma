import React, { useRef, useState, useContext } from 'react'
import {ReactComponent as UserLogo} from "../../../resources/logos/user-solid.svg"
import {ReactComponent as LockLogo} from "../../../resources/logos/lock-solid.svg" 
 
import {ReactComponent as LocationLogo} from "../../../resources/logos/location-dot-solid.svg"
import {ReactComponent as PhoneLogo} from "../../../resources/logos/phone-solid.svg"
import {ReactComponent as AtLogo} from "../../../resources/logos/at-solid.svg"
import jsonData from "../../../JSON/wilaya&commune.json"
import {Link} from "react-router-dom"
import "./RegisterClient.css"
import { client } from '../../../App'
import AuthContext from '../../../conctions/AuthContext'

const RegisterClient = () => {

  let {regesterClient} = useContext(AuthContext)

  const [commune, setCommune] = useState([])
  const selectedWilaya = useRef(null)
 
 
  // Remove duplicates based on the "wilaya_name" property using Set
  const uniqueData = Array.from(new Set(jsonData.map((wilaya) => wilaya.wilaya_name_ascii))).map((wilaya_name_ascii) => {
    return jsonData.find((item) => item.wilaya_name_ascii === wilaya_name_ascii);
  });



  const handleChange = () => {
    setCommune(jsonData.filter(commune => commune.wilaya_name_ascii === selectedWilaya.current.value)
    )
    
  } 





  let [isInputEmpty, setIsInputEmpty] = useState(true)

    const handleEmailChange = (e) => {
      e.preventDefault()

      if(e.target.value !== ''){
        setIsInputEmpty(false)
      }else{
        setIsInputEmpty(true)
      }

    }

  return (
    <div className="client-register-conn">
      <div className='registerclient-form'>
        <div className="register-content">
          <div className="inscription">
            <p>inscription</p>
            <div className="line"></div>
          </div>
          <form className="user-info" onSubmit={regesterClient}>
          <div className="full-name">
              <div className="input-box">
                <UserLogo className="icon"/>
                <input type="text" className='input' name="nom" required/>
                <label>Nom</label>
              </div>
              <div className="input-box">
                <UserLogo className="icon"/>
                <input type="text" className='input' name="prenom" required/>
                <label>Prénom</label>
              </div>
            </div>
            <div className="input-box">
              <UserLogo className="icon"/>
              <input type="text" className='input' name="username" required/>
              <label>Nom d'utilisateur</label>
            </div>
            <div className="input-box">
              <AtLogo className="icon"/>
              <input type="email" className='input' name="email" required/>
              <label>Email</label>
            </div>
            <div className="input-box">
              <select onClick={handleChange} ref={selectedWilaya} className='wilaya-input' name='wilaya' required>
                {uniqueData.map(wilaya => <option value={wilaya.wilaya_name_ascii}>{wilaya.wilaya_name_ascii}</option>)}
              </select>
            </div>
            <div className="input-box">
              <select className='wilaya-input' name='commune' required>
                {commune.map(commune => <option value={commune.commune_name_ascii}>{commune.commune_name_ascii}</option>)}
              </select>
            </div>
            <div className="input-box">
 
              <LocationLogo className="icon"/>
 
              <input type="text" className='input' name='adresse' required/>
              <label>Adresse de résidence</label>
            </div>
            <div className="full-name">
              <div className="input-box">
                <UserLogo className="icon"/>
                <input type="text" className='input' required/>
                <label>Nom</label>
              </div>
              <div className="input-box">
                <UserLogo className="icon"/>
                <input type="text" className='input' required/>
                <label>Prénom</label>
              </div>
            </div>
            <div className="input-box">
              <AtLogo className="icon"/>
              <input onChange={handleEmailChange} type="email" className='input' required/>
              <label className={!isInputEmpty? 'email-label-clicked' : '' }>Email</label>
            </div>
            <div className="password">
              <div className="input-box">
                <LockLogo className="icon"/>
                <input type="password" className='input' name='password' required/>
                <label>Mot de passe</label>
              </div>
              <div className="input-box">
                <LockLogo className="icon"/>
                <input type="password" className='input' required/>
                <label>Confirmer le mote de passe</label>
              </div>
            </div>
            <div className="input-box">
                <PhoneLogo className="icon"/>
 
                <input type="text" className='input' name='telephone' required/>
 
                <label>Numéro de téléphone</label>
            </div>
            <div className="btn-submit">
              <button type='submit' className='btn-register'>Inscription</button>
            </div>
            <div className="buttons">
 
              <p>vous avez déja un compte?</p>
 
              <Link className='btn-register' to="/connection">
                <span>Connexion</span>
              </Link>
            </div>
          </form>
        </div>
        <div className="rectangle"></div>
      </div>   
    </div>
  )
}

export default RegisterClient