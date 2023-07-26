import React, { useRef, useState } from 'react'
import {ReactComponent as UserLogo} from "../../../resources/logos/user-solid.svg"
import {ReactComponent as LockLogo} from "../../../resources/logos/lock-solid.svg"
import {ReactComponent as HashLogo} from "../../../resources/logos/hashtag-solid.svg"
 
import {ReactComponent as LocationLogo} from "../../../resources/logos/location-dot-solid.svg"
import {ReactComponent as PhoneLogo} from "../../../resources/logos/phone-solid.svg"
import {ReactComponent as AtLogo} from "../../../resources/logos/at-solid.svg"
 
import {ReactComponent as HammerLogo} from "../../../resources/logos/hammer-solid.svg"
import {ReactComponent as PenLogo} from "../../../resources/logos/pen-clip-solid.svg"
import {ReactComponent as CameraLogo} from "../../../resources/logos/camera-solid.svg"
import jsonData from "../../../JSON/wilaya&commune.json"
import {Link} from "react-router-dom"
import "./RegisterWorker.css"

const RegisterWorker = () => {

  // Remove duplicates based on the "wilaya_name" property using Set
  const uniqueData = Array.from(new Set(jsonData.map((wilaya) => wilaya.wilaya_name))).map((wilaya_name) => {
    return jsonData.find((item) => item.wilaya_name === wilaya_name);
  });

  const [commune, setCommune] = useState([])
  const selectedWilaya = useRef(null)

  const handleChange = () => {
    setCommune(jsonData.filter(commune => commune.wilaya_name === selectedWilaya.current.value) )
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
    <div className="worker-register-conn">
      <div className='register-form'>
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
              <input type="email" onChange={handleEmailChange} className='input' required/>
              <label className={!isInputEmpty? 'email-label-clicked' : '' }>Email</label>
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
            <div className="input-box">
                <HammerLogo className="icon"/>
                <input type="text" className='input' required/>
                <label>Service</label>
            </div>
            <div className="input-box">
                <select className='wilaya-input' required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
            </div>
            <div className="input-box">
                <PenLogo className="icon"/>
                <input type="text" className='input' required/>
                <label>Discription du sevice</label>
            </div>
            <div className="input-box">
                <CameraLogo className="icon"/>
                <input type="file" className='input' required/>
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

export default RegisterWorker