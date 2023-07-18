import { useLocation } from 'react-router-dom';
import React, { useEffect} from 'react';
import axios from 'axios';
 

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function ValidationPage(){

    const location = useLocation();
    let token,id,typea;
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      token = searchParams.get('token');
      id = searchParams.get('id');
      typea = searchParams.get('typea');
       
    }, [location.search]);

  function validSubmit(event){
    event.preventDefault();

    const jas = { 
        token: token,
        id: id,
        typea: typea,
    }
    client.post('/api/valid/', jas  )
      .then(response => {
        console.log('Registration successful:', response.data);
        
      })
      .catch(error => {
        console.error('Registration failed:', error);
        
      });
    console.log(jas);
  };

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
