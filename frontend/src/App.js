
import React, { useState, useEffect, useContext } from 'react';

import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Acceuil from './pages/Acceuil/Acceuil';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListServices from './pages/Nos_services/ListServices';
import ConsulterService from './pages/ConsulterService/ConsulterService';
import Inscription from './pages/Inscription/Inscription';
import RegisterClient from './pages/Inscription/Register-client/RegisterClient'
import RegisterWorker from './pages/Inscription/Register-worker/RegisterWorker'
import FAQ from './pages/FAQ/FAQ';
import NavbarClient from './components/NavbarClient/NavbarClient';

import Login from './pages/Login/Login';
import AboutUs from './pages/AboutUs/AboutUs';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ValidationPage from './pages/ValidationPage';
import InboxClient from './pages/BoiteRecepClient/InboxClient';
import ProfileWorker from './pages/profile_worker/ProfileWorker';

import Backendtest from './pages/Backendtest';
import Annoncetesting from './testing/Annoncetesting';
import GoTop from './components/GoTopBtn/GoTop';
import axios from 'axios';


import PrivateRoute from './conctions/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './conctions/AuthContext';
import ProfilClient from './pages/Profil_client/ProfilClient';
import ConsulterProfile from './pages/ConsulterProfile/ConsulterProfile'; 
import InboxWorker from './pages/BoiteRecepWorker/InboxWorker';
import NavbarWorker from './components/NavbarWorker/NavbarWorker';

 

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
export const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});




function App() {

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
        <AuthProvider>
  
          <ScrollToTop />


          <header className="App-header">
             <Navbar /> 
            <NavbarClient />
            <NavbarWorker />
          </header>

          <GoTop scrollRate={scrollRate} />

          <main>

            <Routes>

              <Route path='/services' element={<ListServices />} />
              <Route path='/services/:categ' element={<ListServices />} />


              <Route path='/service/:numAnn/:idArtisan' element={<ConsulterService />} />
              <Route path='/service/:numAnn/:idArtisan/profile' element={<ConsulterProfile />} />



              <Route path='/FAQ' element={<FAQ />} />
              <Route path='/inscription' element={<Inscription />} />

              <Route path='/' element={<Acceuil />} />
              {/* <Route exact path='/' element={<PrivateRoute/>}>
              <Route exact path='/' element={<Acceuil/>}/>
             </Route> */}

              <Route path='/register-worker' element={<RegisterWorker />} />
              <Route path='/register-client' element={<RegisterClient />} />
              <Route path='/connection' element={<Login />} />
              <Route path='/about us' element={<AboutUs />} />




              <Route path='/backendtest' element={<Backendtest />} />
              <Route path='/Annoncetesting' element={<Annoncetesting />} />


              <Route exact path='/ValidationPage' element={<PrivateRoute/>}>
                <Route exact path='/ValidationPage' element={<ValidationPage/>}/>
              </Route> 
              <Route exact path='/profil/client' element={<PrivateRoute/>}>
                <Route exact path='/profil/client' element={<ProfilClient/>}/>
              </Route>

              <Route exact path='/profil/worker' element={<PrivateRoute/>}>
                <Route exact path='/profil/worker' element={<ProfileWorker/>}/>
              </Route>

              <Route exact path='/inbox/worker' element={<PrivateRoute/>}>
                <Route exact path='/inbox/worker' element={<InboxWorker/>}/>
              </Route> 

              <Route exact path='/inbox/client' element={<PrivateRoute/>}>
                <Route exact path='/inbox/client' element={<InboxClient/>}/>
              </Route> 
                
              <Route path='*' element={<ErrorPage />} />
            </Routes>

          </main>


          <footer className='App-footer'>
            <Footer />
          </footer>
        
        </AuthProvider>
      </Router>

    </div>
  );

}

export default App;
