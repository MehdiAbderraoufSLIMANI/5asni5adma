import React from 'react'
import "./ConsulterProfile.css"
import profilPic from "../../resources/images/img-worker-profil.svg"
import { ReactComponent as StarLogo } from '../../resources/logos/star.svg'
import {Link} from "react-router-dom"

const ConsulterProfile = () => {

    
  return (
    <div className='container-consulter-profile'>
      <div className="first-section">
        <p>about the worker</p>
        <div className="profile">
          <img src={profilPic} alt='image de profile'/>
          <div className="worker-info">
            <div className="name">
              <p>Vicky Smith</p>
              <p>@username</p>
            </div>
            <p>slm montage et réparation tout type de climatiseur chambre froid réparation frigidaire frigo machine a laver Lave vaisselle a domicile.....................................................</p>
            <div className="rating">
              <StarLogo className="star"/>
              <p>4.7</p>
            </div>
          </div>
        </div>
        <div className="contactMeBtn">
          <Link to='?'>Contacter moi</Link>
        </div>
      </div>
      <div className="second-sec">
        <div className="info-about-worker">
          <div className="first">
            <p>De<br/><span>Alger, bab el oued</span></p>
            <p>temps de réponse moyen<br/><span>3hrs</span></p>
          </div>
          <div className="second">
            <p>Membre depuis<br/><span>juillet 2022</span></p>
            <p>Langue<br/><span>Arabe, Francais , englais</span></p>
          </div>  
        </div>
        <div className="line"/>
        <div className="details">
          <p>
            Greetings! Welcome to my 5asni5adam profile. My name is vicky, and I specialize in hygiene. I have a growing interest in generation technologies such as Stable Diffusion. My primary focus is on AI and image generation related projects. I am committed to providing exceptional customer service and ensuring complete satisfaction for my clients. Thank you for considering me for your project, and I am thrilled to work with you and bring your vision to life.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConsulterProfile