import React, { useContext, useState, CSSProperties, useEffect  } from 'react'
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

import AuthContext from '../../conctions/AuthContext'

import ScaleLoader from 'react-spinners/ScaleLoader'

import defaultPic from '../../resources/images/user.png'
import EditWorkerForm from './EditWorkerForm'




const override = {
    display: "block",
    margin: "21% auto",
    width: "80px",
    borderColor: "red",
  };
  

const ProfileWorker = () => {

    const navigate = useNavigate()

    let handleEditingEvent = () => {
        navigate('./editer')
    }

    
    const [visible, setVisible] = useState(false)


    let { user ,EditProfil} = useContext(AuthContext);
   
    const someData = {
      id: user.id, username: user.username, email: user.email, password: '123456',
      nom: user.nom, prenom: user.prenom, tel: user.tel, wilaya: user.wilaya, commune: user.commune, adresse: user.adresse
    }
    const [currentUser, setCurrentUser] = useState(someData);
  
  
  
    const [showEditForm, setShowEditForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [margin, setMargin] = useState(600);
    useEffect(() => {
      if(isLoading==true) {
        setMargin(800);
        window.scrollTo(0, 0);
      }else {
        setMargin(600)
      }
    }, [isLoading])
  
    const cancelHandler = () => {
      setIsLoading(true);
      
      setTimeout(()=> {
       setIsLoading(false);
       setShowEditForm(false);
      },1500)
    }
    const showEdit = () => {
      setIsLoading(true);
      setShowEditForm(true);
      
      setTimeout(()=> {
        setIsLoading(false);
      },1500)
    }
  
    const submitEditHandler = async (data) => {
   
     
      try {
       const respon = await EditProfil(data);
        
      
      } catch (error) { 
        console.log("ProfilClient "+error)  
        throw error;
   
        
      }
     
      
    }




  return (
    <div >
        
        {isLoading && 
    <div className="disabled">
        <ScaleLoader color="#EA4C36" loading={isLoading} size={150}  cssOverride={override} />
    </div>
  }
    {!isLoading && !showEditForm &&

  <div className="container-profil-worker">

        <div className="info">
            <div className="basic-info">
                <div className="image">
                    <img src={photoProfile} alt="Image de profile" />
                    <ConnectedLogo className='connected-logo'/>
                </div>
                <div className="username-full-name">
                    <p>{currentUser.nom} & {currentUser.prenom}</p>
                    <p>@{currentUser.username}</p>
                </div>
                <div className="edit-profil-btn" onClick={showEdit}>
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
                            <p> {`${currentUser.commune}, ${currentUser.wilaya}`} </p>
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
            <div onClick={() => {navigate("./gig")}} className="add-btn">
                <PlusLogo className="plus-logo"/>
            </div>
        </div>

</div>
}
    { (showEditForm && !isLoading) &&
        <EditWorkerForm submitEditHandler={submitEditHandler} currentUser={currentUser} cancelHandler={cancelHandler} />
      }

    </div>
  )
}

export default ProfileWorker