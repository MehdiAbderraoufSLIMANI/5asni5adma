
/*
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
*/
import React, {useState , useEffect} from 'react';
import axios from 'axios';

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Acceuil from './pages/Acceuil';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListServices from './pages/ListServices';
import FAQ from './pages/FAQ';
import Inscription from './pages/Inscription';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


function App() {


/***********************fetch***************************
  let [user , setUsers] = useState([])
  /*let [users , setUsers] = useState([])

  useEffect (() => {
    getUsers()
  }, [])

  let users = async ()=>{
    let respo = await fetch("http://127.0.0.1:8000/api/client")
    let data = await respo.json()
    console.log(data)
    setUsers(data)
  }

  let getUsers = async ()=>{
    let respo = await fetch("http://127.0.0.1:8000/apis/")
    let data = await respo.json()
    console.log(data)
    setUsers(data)
  }*/
  return (
    <div className="App">
      <Router>

        <header className="App-header">
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Acceuil />} />
            <Route path='/services' element={<ListServices />} />
            <Route path='/services/:categorie' element={<ListServices />} />
            <Route path='/FAQ' element={<FAQ />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route path='/connection' element={<Login />} />
            <Route path='/about us' element={<AboutUs />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </main>

        <footer className='App-footer'>
          <Footer />
        </footer>

      </Router>

    </div>
  );



 
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
