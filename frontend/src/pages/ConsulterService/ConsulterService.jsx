import React, { useContext , useState ,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {ReactComponent as ConnectedLogo} from "../../resources/logos/connected.svg"
import {ReactComponent as Star} from "../../resources/logos/star.svg"
import {ReactComponent as StarEmpty} from "../../resources/logos/empty-star.svg"
import {ReactComponent as LocationLogo} from "../../resources/logos/location-dot-solid.svg"
import {ReactComponent as PhoneLogo} from "../../resources/logos/phone-solid.svg"
import {ReactComponent as PaperPlaneLogo} from "../../resources/logos/paper-plane-regular.svg"
import profileImg from "../../resources/images/profile-picture.svg"
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import Comment from '../../components/Comment/Comment'

// slider images
import image1 from "../../resources/images/Rectangle 325.png"
import image2 from "../../resources/images/Rectangle 326.png"
import image3 from "../../resources/images/Rectangle 322.png"
import image4 from "../../resources/images/Rectangle 323.png"
import image5 from "../../resources/images/Rectangle 324.png"

// slider images 

import { createContext } from 'react'  
import axios from 'axios';
import dayjs from 'dayjs'
import jwt_decode from "jwt-decode";
import AuthContext from '../../conctions/AuthContext'
import './ConsulterService.css'
import { debounce } from 'lodash';

import ScaleLoader from 'react-spinners/ScaleLoader'

import defaultPic from '../../resources/images/user.png'
const ConsulterService = () => {  
    
    const override = {
        display: "block",
        margin: "21% auto",
        width: "80px",
        borderColor: "red",
      };

    const [displayed, setDisplayed] = useState(false)

    const images = [image1, image2, image3, image4, image5]
 

    const [isLoading, setIsLoading] = useState(true);

    
    const baseURL = 'http://127.0.0.1:8000'


    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)  

    const [imageArray, setImageArray] = useState(images); 
    const client = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${authTokens?.access}`}
    });


    client.interceptors.request.use(async req => {
    
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) return req
    
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authTokens.refresh
          });
    
        localStorage.setItem('authTokens', JSON.stringify(response.data))
        
        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))
        
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })

 
     
 

    let getAnnonce = async (numAnn)=> {
      

    
       
    try { 
        const response = client.get(`/api/oneannonce/${numAnn}/`);
        return response;
        
    } catch (error) {
        return error;
    }
      
    }


    let { numAnn ,idArtisan } = useParams();
    
    const [resp, setresp] = useState(  );
 
      

      useEffect(() => {
        setIsLoading(true);
      
        const fetchData = async () => {
          try {
            const res = await getAnnonce(numAnn);
      
            // Assign res.data to resp inside the try block
            setresp(res.data);
      
            // Use Object.keys on resp.images and create the imagesArray
            const imagesArray = Object.keys(res.data.images).map((key) => res.data.images[key].img_annonce);
            setImageArray(imagesArray);
      
          } catch (error) {
            // Handle errors if needed
          } finally {
            
              setIsLoading(false);
            
          }
        };
      
        fetchData();
      }, [numAnn]);
      

      const [margin, setMargin] = useState(600);
      useEffect(() => {
        if(isLoading==true) {
          setMargin(800);
          window.scrollTo(0, 0);
        }else {
          setMargin(600)
        }
      }, [isLoading])

  return (
    <div>

    {isLoading &&     <div className="disabled">
        <ScaleLoader color="#EA4C36" loading={isLoading} size={150}  cssOverride={override} />
    </div>
        }
          {!isLoading &&  
    <div className="container-service-details">

     
   
<div className="card">
            <div className="first-section">
                <div className="profile">
                    <div className="profile-img">
                    <Link to={`/service/${numAnn}/${idArtisan}/profile`}>
                        <img src={(resp.artisan.img) ? baseURL+resp.artisan.img : defaultPic} alt="profile-pic"/>
                        <ConnectedLogo className='connected-logo' />
                        </Link> 
                    </div>
           
                    <div className="info-worker">
                        <div className="name-rating">
                            <p>{resp.artisan.nom} {resp.artisan.prenom}</p>
                            <div className="rating">
                                <Star className='start-logo'/>
                                <p>{resp.rating_annonce}</p>  
                            </div>
                        </div>
                        <div className="title">
                            <p>{resp.service}</p>
                        </div>
                        <div className="adresse">
                            <LocationLogo className='location-logo'/>
                            <p>{resp.artisan.wilaya}, {resp.artisan.commune}</p>
                           
                        </div>
                        <br/><br/><br/>
                        <div className="phone-number">
                            <PhoneLogo className='phone-logo'/>
                            <p>{resp.artisan.tel}</p>
                        </div>
                    </div>
                </div>
                <div className="categorie">
                    <p>Catégorie: {resp.categorie}</p>
                </div>
            </div>
            <div className="description">
                <p>Déscription</p>
                <p>{resp.description}</p>
            </div>
            <div className="image-slider">
                <ImageSlider images={imageArray} baseURL={baseURL} />
            </div>
            <hr/>
            <div className="contacter-worker">
                <p>Contacter et discuter le prix</p>
                <div className="btn-contact">
                    <div className="phone-icon">
                        <PhoneLogo className="phone-logo"/>
                    </div>
                    <div className="paper-icon">
                        <PaperPlaneLogo className='plane-logo'/>
                    </div>
                </div>
            </div>
        </div>
          

        <div className="comment-section">
            <p>1566 commentaire</p>
            <div className="comment-user">
                <div className="rating">
                    <p>Lisser un avis</p>
                    <div className="stars">
                        <Star className="start-filled"/>
                        <Star className="start-filled"/>
                        <Star className="start-filled"/>
                        <StarEmpty className="star-empty"/>
                        <StarEmpty className="star-empty"/>
                    </div>
                </div>
                <div className="comment-input">
                    <input className='input' type="text" required/>
                    <label>ajouter un commentaire</label>
                </div>
            </div>
            <div className='comments'>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
            </div>
        </div>

  
    </div>
}</div> 
  )
}

export default ConsulterService