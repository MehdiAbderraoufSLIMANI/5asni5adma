import { createContext, useState, useEffect } from 'react' 
import jwt_decode from "jwt-decode";
  

import axios from 'axios';

import dayjs from 'dayjs'
const AnnonceGrab = createContext()

export default AnnonceGrab;


export const AnnonceGrabProvider  = ({children}) => {


    const baseURL = 'http://127.0.0.1:8000'


    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    
    const client = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${authTokens?.access}`}
    });

    
    client.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }

    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
        refresh: authTokens.refresh
      });

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})




    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    
    let [loading, setLoading] = useState(true)
 

    let getAnnonce = async (numAnn)=> {
      

    
       
    try { 
        const response = client.get(`/api/oneannonce/${numAnn}/`);
        return response;
        
    } catch (error) {
        return error;
    }
      
    }

  

    let contextData = {
        user:user, 
        getAnnonce:getAnnonce,
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)


    }, [authTokens, loading])

    return(
        <AnnonceGrab.Provider value={contextData} >
            {loading ? null : children}
        </AnnonceGrab.Provider>
    )
}