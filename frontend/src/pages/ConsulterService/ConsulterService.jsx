import React from 'react'
import { useParams } from 'react-router-dom'
import {ReactComponent as ConnectedLogo} from "../../resources/logos/connected.svg"
import {ReactComponent as Star} from "../../resources/logos/star.svg"
import {ReactComponent as LocationLogo} from "../../resources/logos/location-dot-solid.svg"
import {ReactComponent as PhoneLogo} from "../../resources/logos/phone-solid.svg"
import profileImg from "../../resources/images/profile-picture.svg"
import './ConsulterService.css'

const ConsulterService = () => {    

  return (
    <div className="container-service-details">
        <div className="card">
            <div className="first-section">
                <div className="profile">
                    <div className="profile-img">
                        <img src={profileImg} alt="profile-pic"/>
                        <ConnectedLogo className='connected-logo' />
                    </div>
                    <div className="info-worker">
                        <div className="name-rating">
                            <p>Nom&Prénom</p>
                            <div className="rating">
                                <Star className='start-logo'/>
                                <p>5.0</p>  
                            </div>
                        </div>
                        <div className="title">
                            <p>Froid et climatisation installation (service) </p>
                        </div>
                        <div className="adresse">
                            <LocationLogo className='location-logo'/>
                            <p>Alger, Kouba</p>
                        </div>
                        <div className="phone-number">
                            <PhoneLogo className='phone-logo'/>
                            <p>12134242432</p>
                        </div>
                    </div>
                </div>
                <div className="categorie"></div>
            </div>
        </div>
    </div>

  )
}

export default ConsulterService