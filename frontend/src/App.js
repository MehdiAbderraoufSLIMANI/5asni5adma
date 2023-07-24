import React, {useState, useEffect } from 'react';
import axios from 'axios';
 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Acceuil from './pages/Acceuil/Acceuil';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListServices from './pages/Nos_services/ListServices';
import ConsulterService from './pages/ConsulterService';
import Inscription from './pages/Inscription/Inscription';
import RegisterClient from './pages/Inscription/Register-client/RegisterClient'
import RegisterWorker from './pages/Inscription/Register-worker/RegisterWorker'
import FAQ from './pages/FAQ';
import Login from './pages/Login/Login';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';
import GoTop from './components/GoTopBtn/GoTop';
import Backendtest from './pages/Backendtest';
import ValidationPage from './pages/ValidationPage';

 

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
  const [scrollRate, setScrollRate] = useState(0);
  
  const handleScroll = () => {
    const element = document.documentElement || document.body;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const rate = (scrollTop / scrollHeight) * 100;
    setScrollRate(rate);
  };

  useEffect(() => {
    // Ajouter un écouteur d'événement de défilement lors du montage du composant
    window.addEventListener('scroll', handleScroll);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
 
  

  return (
    <div className="App">
      <Router>

        <header className="App-header">
          <Navbar />
        </header>

        <GoTop scrollRate={scrollRate} />  
        
        
        <main>
          <Routes>
            <Route path='/' element={<Acceuil />} />
            <Route path='/services' element={<ListServices />} />
            <Route path='/services/:categ' element={<ListServices />} />
            <Route path='/service/:numAnn/:idArtisan' element={<ConsulterService />} />
            <Route path='/FAQ' element={<FAQ />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route path='/register-worker' element={<RegisterWorker/>} />
            <Route path='/register-client' element={<RegisterClient />} />
            <Route path='/connection' element={<Login />} />
            <Route path='/about us' element={<AboutUs />} />
            <Route path='*' element={<ErrorPage />} />
            <Route path='/backendtest' element={<Backendtest />} />
            <Route path='/ValidationPage' element={<ValidationPage />} />
          </Routes>

        </main>

        <footer className='App-footer'>
          <Footer />
        </footer>

      </Router>

    </div>
  );
 
}

export default App;
