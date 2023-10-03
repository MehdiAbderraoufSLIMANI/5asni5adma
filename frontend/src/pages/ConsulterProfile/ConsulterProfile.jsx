import React, {useContext, useEffect ,useState} from 'react'
import "./ConsulterProfile.css"
import profilPic from "../../resources/images/img-worker-profil.svg"
import { ReactComponent as StarLogo } from '../../resources/logos/star.svg'
import {Link ,useParams} from "react-router-dom"


import axios from 'axios';
import dayjs from 'dayjs'
import jwt_decode from "jwt-decode";
import AuthContext from '../../conctions/AuthContext'


import ScaleLoader from 'react-spinners/ScaleLoader'
const ConsulterProfile = () => {
  const override = {
    display: "block",
    margin: "21% auto",
    width: "80px",
    borderColor: "red",
  };
  const [isLoading, setIsLoading] = useState(true);

    
  const baseURL = 'http://127.0.0.1:8000'


  const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)  
 
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

  const [resp, setresp] = useState(  );
  
  let { numAnn } = useParams();


  let getAnnonce = async (numAnn)=> {
      

    
       
    try { 
        const response = client.get(`/api/oneannonce/${numAnn}/`);
        return response;
        
    } catch (error) {
        return error;
    }
      
    }


  useEffect(() => {
    setIsLoading(true);
  
    const fetchData = async () => {
      try {
        const res = await getAnnonce(numAnn);
  
        // Assign res.data to resp inside the try block
        setresp(res.data.artisan);
        console.log(res.data.artisan)
     
       
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
    <div className='container-consulter-profile'>
      <div className="first-section">
        <p>About the worker</p>
        <div className="profile">
          <img src={baseURL+resp.img} alt='image de profile'/>
          <div className="worker-info">
            <div className="name">
              <p>{resp.nom}</p>
              <p>@{resp.username}</p>
            </div>
            <p>descraption of the worker</p>
            <div className="rating">
              <StarLogo className="star"/>
              <p>{resp.rating}</p>
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
            <p>De<br/><span>{resp.wilaya}, {resp.commune}</span></p>
            <p>temps de réponse moyen<br/><span>3hrs</span></p>
          </div>
          <div className="second">
            <p>Membre depuis<br/><span>juillet 2022</span></p>
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
    }
    </div>
  )
}

export default ConsulterProfile