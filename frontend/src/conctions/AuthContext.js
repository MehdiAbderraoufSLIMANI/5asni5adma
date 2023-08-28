import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
 
import { useNavigate } from 'react-router-dom'
import { client } from '../App';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

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
            console.error('Registration react failed :', error);
            // Handle error as needed
          });
    };

    let EditProfil = async (data)=> {
    
        try {
            const response = client.put('/api/profile/update/', data );
            console.log('Profile updated successfully:', response.data);
            
            
            const decoded_token = localStorage.getItem('authTokens') ? jwt_decode( localStorage.getItem('authTokens')) : null 
             
            if(decoded_token){
            decoded_token['email'] = data.email
            decoded_token['username'] = data.username
            decoded_token['nom'] = data.nom
            decoded_token['prenom'] = data.prenom
            decoded_token['tel'] = data.tel
            decoded_token['wilaya'] = data.wilaya
            decoded_token['commune'] = data.commune
            decoded_token['adresse'] = data.adresse  
            
            const new_token = jwt.encode(decoded_token)
        }
        } catch (error) {
            console.error('Profile update failed:', error);
            // Handle error and display an error message to the user
        }
    };


    let contextData = {
        user:user,
        authTokens:authTokens,
        EditProfiln:EditProfil,
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