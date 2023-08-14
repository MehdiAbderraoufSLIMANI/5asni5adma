import React from 'react'
import { useParams } from 'react-router-dom'
import {ReactComponent as ConnectedLogo} from "../../resources/logos/connected.svg"
import {ReactComponent as Star} from "../../resources/logos/star.svg"
import {ReactComponent as LocationLogo} from "../../resources/logos/location-dot-solid.svg"
import {ReactComponent as PhoneLogo} from "../../resources/logos/phone-solid.svg"
import profileImg from "../../resources/images/profile-picture.svg"
import ImageSlider from '../../components/ImageSlider/ImageSlider'

// slider images
import image1 from "../../resources/images/Rectangle 325.png"
import image2 from "../../resources/images/Rectangle 326.png"
import image3 from "../../resources/images/Rectangle 322.png"
import image4 from "../../resources/images/Rectangle 323.png"
import image5 from "../../resources/images/Rectangle 324.png"

// slider images


import './ConsulterService.css'

const ConsulterService = () => {    

    const images = [image1, image2, image3, image4, image5]

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
                <div className="categorie">
                    <p>Catégorie: climatiseur</p>
                </div>
            </div>
            <div className="description">
                <p>Déscription</p>
                <p>slm montage et réparation tout type de climatiseur chambre froid réparation frigidaire frigo machine a laver Lave vaisselle a domicile....... ..............................................</p>
            </div>
            <div className="image-slider">
                <ImageSlider images={images}/>
            </div>
        </div>
    </div>

  )
}

export default ConsulterService