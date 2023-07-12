
/*
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
*/
import React, {useState , useEffect} from 'react';
import axios from 'axios';

import './App.css';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


function App() {


/***********************fetch***************************
  let [user , setUsers] = useState([])

  useEffect (() => {
    users()
  }, [])

  let users = async ()=>{
    let respo = await fetch("http://127.0.0.1:8000/api/client")
    let data = await respo.json()
    console.log(data)
    setUsers(data)
  }

  return (
    <div className="App">
      <header className="App-header">
        
      My app

      {user.map((s,index) =>(
        <div>
        <h1 key={index}> name : {s.username}</h1>
        <h2 key={index}> password : {s.password}</h2>
        </div>
        ))}

      </header>
    </div>
  );
**************************************************/


 
const [email, setEmail] = useState(''); 
const [password, setPassword] = useState('');



function submitLogin(e) {
  e.preventDefault();
  client.post(
    "/api/post",
    {
      email: email,
      password: password
    }
  );
}


  return (
    <form onSubmit={submitLogin}>
    <div className="mb-3">
      <label htmlFor="email">Email address</label>
      <input type="email" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
      <small className="text-muted">
        We'll never share your email with anyone else.
      </small>
    </div>
    <div className="mb-3">
      <label htmlFor="password">Password</label>
      <input type="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    </div>
    <button type="submit">Submit</button>
  </form>
  
  );
}
 
export default App;
