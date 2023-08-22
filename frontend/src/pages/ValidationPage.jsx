import { useLocation , Navigate } from 'react-router-dom';
import React, { useEffect , useState } from 'react';
import axios from 'axios';
 

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function ValidationPage(){

    const location = useLocation();  
    const [token, setToken] = useState(null);
    const [id, setUserId] = useState(null);
    const [typea, setTypea] = useState(null);
    useEffect(() => {
      

      
      const searchParams = new URLSearchParams(location.search);
      const newToken = searchParams.get('token');
      const newId = searchParams.get('id');
      const newTypea = searchParams.get('typea');
  
      // Set state only if the parameters are not empty
      if (newToken && newId && newTypea) {
        setToken(newToken);
        setUserId(newId);
        setTypea(newTypea);
      }
      console.log(token)
  
         // Cleanup function to handle unmounting
    return () => { 
      setToken(null);
      setUserId(null);
      setTypea(null);
    };
    }, [location.search]);

  function validSubmit(event){
    event.preventDefault();
 
    client.post('/api/valid/',  { 
      token: token,
      id: id,
      typea: typea,
  }  )
      .then(response => {
        console.log('Registration successful:', response.data);
        
      })
      .catch(error => {
        console.error('Registration failed:', error);
        
      });  
  };
 
  const shouldRedirect = token === null || id === null || typea === null;

    return (
      
      <div>
      
        <form onSubmit={e => validSubmit(e)}>
        <div>valide</div>
        <input type="submit" value="Register" />
        </form>
      </div>
    );

    
}


export default ValidationPage;
