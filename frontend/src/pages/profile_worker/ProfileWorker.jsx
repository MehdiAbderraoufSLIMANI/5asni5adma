import React, { useState } from 'react'
import "./ProfileWorker.css"
import {Link} from "react-router-dom"
import photoProfile from '../../resources/images/nadhir.jpeg'
import GigImage from '../../resources/images/gig-image.png'
import {ReactComponent as ConnectedLogo} from "../../resources/logos/connected.svg"
import { ReactComponent as LocationLogo } from "../../resources/logos/location-dot-solid.svg"
import { ReactComponent as UserLogo } from "../../resources/logos/user-solid.svg"
import { ReactComponent as PlusLogo } from "../../resources/logos/plus-solid.svg"
import { ReactComponent as Dot } from "../../resources/logos/dot.svg"
import { useNavigate } from 'react-router-dom'


const ProfileWorker = () => {


    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)

  return (
    <div className="container-profil-worker">
        <div className="info">
            <div className="basic-info">
                <div className="image">
                    <img src={photoProfile} alt="Image de profile" />
                    <ConnectedLogo className='connected-logo'/>
                </div>
                <div className="username-full-name">
                    <p>Nom & Prénom</p>
                    <p>@Nom d'utilisateur</p>
                </div>
                <div onClick={()=>{navigate('./editer')}} className="edit-profil-btn">
                    <p>Modifier mon profile</p>
                </div>
                <div className="line"></div>
                <div className="infos-secondaire">
                    <div className="location-sec">
                        <div className="location">
                            <LocationLogo className='location-logo'/>
                            <p>de</p>
                        </div>
                        <div className="location-txt">
                            <p>Sidi Mhammed, Alger</p>
                        </div>
                    </div>
                    <div className="location-sec">
                        <div className="location">
                            <UserLogo className='location-logo'/>
                            <p>membre depuis</p>
                        </div>
                        <div className="location-txt">
                            <p>Juillet 2021</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="basic-info2">
                <div className="education">
                    <p>Education</p>
                    <p>Master 2 - BenYoucef BenKheddAa</p>
                </div>  
                <div className="line"></div>
                <div className="skills">
                    <p>skills</p>
                    <div className="skills-list">
                
                        <div className="skill">
                            <p>skill 1</p>
                        </div>
                        <div className="skill">
                            <p>skill 2</p>
                        </div>
                        <div className="skill">
                            <p>skill 3</p>
                        </div>
                        <div className="skill">
                            <p>skill 4</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="gigs">
            <div className="gigs-container">
                <div className="gig">
                    <div className="image-container">
                        <img src={GigImage} alt="Image du gig" />
                    </div>
                    <div className="gig-description">
                        <p>Gig #1</p>
                        <p>Iure corporis non qui libero ipsum velit quaerat maiores porro. Est autem cumque et et eos pariatur ducimus delectus.</p>
                        <div className="gig-category">
                            <p>Catégorie: climatiseur</p>
                        </div>
                    </div>
                    <div className="dots" onClick={()=>setVisible(!visible)}>
                        <Dot className='dot'/>
                        <Dot className='dot'/>
                        <Dot className='dot'/>
                        <div className={`drop-list ${visible? 'visible' : null}`}>
                            <ul>
                                <li><Link to='#'>Modifier</Link></li>
                                <li><Link to='#'>suprimer</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>   
            <div className="add-btn">
                <PlusLogo className="plus-logo"/>
            </div>
        </div>
    </div>
  )
}

export default ProfileWorker