 
import React, {useState, useEffect } from 'react';
import axios from 'axios';
 
import './App.css';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Acceuil from './pages/Acceuil/Acceuil';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListServices from './pages/Nos_services/ListServices';
import ConsulterService from './pages/ConsulterService';
import FAQ from './pages/FAQ';
import Inscription from './pages/Inscription';
import Login from './pages/Login/Login';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';
import ValidationPage from './pages/ValidationPage'; 

import Backendtest from './pages/Backendtest';
import Annoncetesting from './testing/Annoncetesting';

import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
export const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});
import GoTop from './components/GoTopBtn/GoTop'; 

function App() {
 

  // List of routes where Navbar should be hidden
  const hideNavbarRoutes = ['/connection'];



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
            <Route path='/connection' element={<Login />} />
            <Route path='/about us' element={<AboutUs />} />
            <Route path='*' element={<ErrorPage />} />
            <Route path='/ValidationPage' element={<ValidationPage />} />

            
            <Route path='/backendtest' element={<Backendtest />} />
            <Route path='/Annoncetesting' element={<Annoncetesting />} />
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
