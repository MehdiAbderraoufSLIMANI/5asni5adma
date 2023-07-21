
import React from 'react'; 
 
import './App.css';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Acceuil from './pages/Acceuil/Acceuil';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListServices from './pages/ListServices';
import FAQ from './pages/FAQ';
import Inscription from './pages/Inscription';
import Login from './pages/Login/Login';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';
import Backendtest from './pages/Backendtest';
import ValidationPage from './pages/ValidationPage'; 
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
export const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


function App() {
 

  // List of routes where Navbar should be hidden
  const hideNavbarRoutes = ['/connection'];

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
