import React, { useRef, useState } from 'react'
import {ReactComponent as UserLogo} from "../../../resources/logos/user-solid.svg"
import {ReactComponent as LockLogo} from "../../../resources/logos/lock-solid.svg"
import {ReactComponent as HashLogo} from "../../../resources/logos/hashtag-solid.svg"
 
import {ReactComponent as LocationLogo} from "../../../resources/logos/location-dot-solid.svg"
import {ReactComponent as PhoneLogo} from "../../../resources/logos/phone-solid.svg"
import {ReactComponent as AtLogo} from "../../../resources/logos/at-solid.svg"
import jsonData from "../../../JSON/wilaya&commune.json"
import {Link} from "react-router-dom"
import "./RegisterClient.css"

const RegisterClient = () => {

 
  // Remove duplicates based on the "wilaya_name" property using Set
  const uniqueData = Array.from(new Set(jsonData.map((wilaya) => wilaya.wilaya_name))).map((wilaya_name) => {
    return jsonData.find((item) => item.wilaya_name === wilaya_name);
  });

  const [commune, setCommune] = useState([])
  const selectedWilaya = useRef(null)

  const handleChange = () => {
    setCommune(jsonData.filter(commune => commune.wilaya_name === selectedWilaya.current.value) )
  } 

  return (
    <div className="client-register-conn">
      <div className='registerclient-form'>
        <div className="register-content">
          <div className="inscription">
            <p>inscription</p>
            <div className="line"></div>
          </div>
          <form className="user-info">
            <div className="input-box">
              <HashLogo className="icon"/>
              <input type="number" className='input' required/>
              <label>Numéro nationale</label>
            </div>
            <div className="input-box">
              <select onClick={handleChange} ref={selectedWilaya} className='wilaya-input' required>
                {uniqueData.map(wilaya => <option value={wilaya.wilaya_name}>{wilaya.wilaya_name}</option>)}
              </select>
            </div>
            <div className="input-box">
              <select className='wilaya-input' required>
                {commune.map(commune => <option value={commune.commune_name}>{commune.commune_name}</option>)}
              </select>
            </div>
            <div className="input-box">
 
              <LocationLogo className="icon"/>
 
              <input type="text" className='input' required/>
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
              <input type="email" className='input' required/>
              <label>Email</label>
            </div>
            <div className="password">
              <div className="input-box">
                <LockLogo className="icon"/>
                <input type="password" className='input' required/>
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
 
                <input type="text" className='input' required/>
 
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