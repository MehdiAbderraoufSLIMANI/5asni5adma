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
    const [token, setToken] = useState('');
    const [id, setUserId] = useState('');
    const [typea, setTypea] = useState('');
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      setToken(searchParams.get('token'));
      setUserId(searchParams.get('id'));
      setTypea(searchParams.get('typea')); 
      
       
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
  if(token.length === 0 || id.length === 0  || typea.length === 0 ){
    console.log('errour : ')
    return <Navigate to="*" />;
  }

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
