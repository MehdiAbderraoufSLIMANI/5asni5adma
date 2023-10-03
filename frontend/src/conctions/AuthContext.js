import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
 
import { useNavigate } from 'react-router-dom' 

import axios from 'axios';
 

import createAxiosInstance from './createAxiosInstance';
const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {


    const baseURL = 'http://127.0.0.1:8000'


    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
   


    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    
    let [loading, setLoading] = useState(true)

    const history = useNavigate()

    let loginUser =  async (e )=> {
        e.preventDefault()
        const login = axios.create({
            baseURL 
        });

        const formData = new FormData();
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value);
        await login.post('/api/token/', formData)
        .then(  (response ) => { 
            const data = response.data;
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/')
        })
        .catch((error) => { 
        console.log(error)
         throw error 
        });

 
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

        const resgsterclient = axios.create({
            baseURL 
        });

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
        resgsterclient.post('/api/register-client/', formData)
          .then((response ) => {
            console.log('Registration successful!');
            loginUser(e)
            return true
          })
          .catch((error) => { 
            throw error
            // Handle error as needed
          });
    };


    let regesterWorker = async (e)=> {
        const resgsterWorker = axios.create({
            baseURL 
        });

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
        
        resgsterWorker.post('/api/register-worker/', formData)
          .then((response ) => {
            console.log('Registration successful!');
            loginUser(e)
          })
          .catch((error) => { 
            return error;
          
          });
    };


    
    let EditProfil = async (data)=> {
       
        const client =await createAxiosInstance();
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
        formData.append("oldpassword", data.oldpassword);

        if (data.Newpassword){
            if(data.oldpassword != data.Newpassword){
                formData.append("Newpassword", data.Newpassword);
            }

        }
        try {
             
            const response =await client.put(`/api/profile/update/`, formData); 
            await logoutUser();
            return 'Profile updated successfully';
        
            
        } catch (error) {
            console.log(error)
            throw error.response.data.error;
            
              
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