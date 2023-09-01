import React, { useContext, useState, CSSProperties, useEffect } from 'react'
import AuthContext from '../../conctions/AuthContext'
import defaultPic from '../../resources/images/user.png'
import ScaleLoader from 'react-spinners/ScaleLoader'
import EditClientForm from './EditClientForm'
import './ProfilClient.css';


const override = {
  display: "block",
  margin: "21% auto",
  width: "80px",
  borderColor: "red",
};

export default function ProfilClient() {
  let { user ,EditProfil,logoutUser} = useContext(AuthContext);
   
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

  //inclure un champ de type file pour permettre à l'user de modifier son avatar s'il veut bien, sinon on garde l'ancien avatar
  return ( <div className='profil-con'>
    {isLoading && 
    <div className="disabled">
        <ScaleLoader color="#EA4C36" loading={isLoading} size={150}  cssOverride={override} />
    </div>
  }

    <div className='container-fluid profile-container'style={{marginBottom: margin+'px'}}>
      <div className="row justify-content-between">

        {!isLoading && 
        <div className="col-md-4 col-sm-3 bio-container">
          
          { (showEditForm && !isLoading) ?(
          <div className='img-container'>
            <img src={(user && user.pic) ? user.pic : defaultPic} alt='pic' /> 
            
          </div>
          ):(
            <div className='img-container'>
          
            <img src={(user && user.pic) ? user.pic : defaultPic} alt='pic' />
          
            <div className="ball-container">
              <div className="greenBall"></div>
            </div>
            <p className='full-name'> {currentUser.nom} {currentUser.prenom} </p>
            <p className='username'> @{currentUser.username} </p>
          </div>


          )  } 
            { (!showEditForm ) &&
            <div className="adress-container">
             <i className="bi bi-geo-alt-fill ms-4 me-2"></i><span>De</span>
             <span className='adress'> {`${currentUser.commune}, ${currentUser.wilaya}`} </span>
          </div>
              }

        </div>
        }
        
        { (!showEditForm && !isLoading) && 
        <div className="col-md-6 allInfo">
        <h3>Informations du profil</h3>
        <div className="info-container">
          <div className='row '>
            <div className="col-md-4">
              <span className='label'>Nom</span>
            </div>
            <div className="col-md-2">
              <span className='info'> {currentUser.nom} </span>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className="col-md-4">
              <span className='label'>Prenom</span>
            </div>
            <div className="col-md-2">
              <span className='info'> {currentUser.prenom} </span>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className="col-md-4">
              <span className='label'>Email</span>
            </div>
            <div className="col-md-2">
              <span className='info'> {currentUser.email} </span>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className="col-md-4">
              <span className='label'>Tél</span>
            </div>
            <div className="col-md-2">
              <span className='info'> {currentUser.tel} </span>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className="col-md-4">
              <span className='label'>Wilaya</span>
            </div>
            <div className="col-md-2">
              <span className='info'> {currentUser.wilaya} </span>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className="col-md-4">
              <span className='label'>Commune</span>
            </div>
            <div className="col-md-2">
              <span className='info'> {currentUser.commune} </span>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className="col-md-4">
              <span className='label'>Adresse</span>
            </div>
            <div className="col-md-2">
              <span className='info'> {currentUser.adresse} </span>
            </div>
          </div>

          </div>
       
          <button className='btn d-flex mx-auto editBtn' onClick={showEdit}>Editer votre profil</button>
        </div>
      }

      { (showEditForm && !isLoading) &&
        <EditClientForm submitEditHandler={submitEditHandler} currentUser={currentUser} cancelHandler={cancelHandler} />
      }
      </div>

    </div>
    </div>
  )
}