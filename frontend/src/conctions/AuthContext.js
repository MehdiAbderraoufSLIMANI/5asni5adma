import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
 
import { useNavigate } from 'react-router-dom' 

import axios from 'axios';

import dayjs from 'dayjs'
const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {


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

    const history = useNavigate()

    let loginUser = async (e )=> {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if(response.status === 200){
            
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/')
        }else{
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/')
    } 

    const isLoggedIn = () => {
        return authTokens != null;
      };


      let regesterClient = async (e)=> {
        e.preventDefault()
        const formData = new FormData();
        formData.append("nom", e.target.elements.nom.value);
        formData.append("prenom", e.target.elements.prenom.value);
        formData.append("username", e.target.elements.username.value);
        formData.append("email", e.target.elements.email.value);
        formData.append("wilaya", e.target.elements.wilaya.value);
        formData.append("commune", e.target.elements.commune.value);
        formData.append("adresse",  e.target.elements.adresse.value);
        formData.append("password", e.target.elements.password.value);
        formData.append("telephone", e.target.elements.telephone.value);
        formData.append("img", e.target.elements.img.files[0]); 
          client.post('/api/register-client/', formData)
          .then((response ) => {
            console.log('Registration successful!');
            loginUser(e)
          })
          .catch((error) => { 
            return error;
            // Handle error as needed
          });
    };


    let regesterWorker = async (e)=> {
        e.preventDefault()
        const formData = new FormData();
        formData.append("nom", e.target.elements.nom.value);
        formData.append("prenom", e.target.elements.prenom.value);
        formData.append("username", e.target.elements.username.value);
        formData.append("email", e.target.elements.email.value);
        formData.append("wilaya", e.target.elements.wilaya.value);
        formData.append("commune", e.target.elements.commune.value);
        formData.append("adresse",  e.target.elements.adresse.value);
        formData.append("password", e.target.elements.password.value);
        formData.append("telephone", e.target.elements.telephone.value);
        formData.append("img", e.target.elements.img.files[0]); 
        
          client.post('/api/register-worker/', formData)
          .then((response ) => {
            console.log('Registration successful!');
            loginUser(e)
          })
          .catch((error) => { 
            return error;
          
          });
    };

    let EditProfil = async (data)=> {
       

        const formData = new FormData();
 
        formData.append("adresse", data.adresse);
        formData.append("commune", data.commune);
        formData.append("email", data.email);
        formData.append("nom", data.nom);
        formData.append("prenom", data.prenom);
        formData.append("tel", data.tel);
        formData.append("username", data.username);
        formData.append("wilaya", data.wilaya);
        formData.append("img", data.profileImage);
       
        try {
            console.log(authTokens)
            const response = client.put(`/api/profile/update/`, formData);
            console.log('Profile updated successfully:', response );
            
            
        
            
        } catch (error) {
            if (error.response.status === 401) {
                console.error('Authentication failed:', error);
                // Handle authentication errors, e.g., redirect to login
              } else {
                console.error('Profile update failed:', error);
                // Handle other errors and display an error message to the user
              }
        }
      

    };


    let contextData = {
        user:user,
        authTokens:authTokens,
        EditProfil:EditProfil,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
        isLoggedIn: isLoggedIn,
        regesterClient:regesterClient,
        regesterWorker:regesterWorker,
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)


    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}