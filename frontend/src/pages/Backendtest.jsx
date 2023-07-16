import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

function Backendtest() {
  let [FormData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nom: '',
    prenom: '',
    tel: '',
    wilaya: '',
    commune: '',
    adresse: '',
    rating: '',
    category_of_worker: '',
    compte_type: 'worker'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const jas = { 
        username: FormData['username'],
        email: FormData['email'],
        password: FormData['password'],
        nom: FormData['nom'],
        prenom: FormData['prenom'],
        tel: FormData['tel'],
        wilaya: FormData['wilaya'],
        commune: FormData['commune'],
        adresse: FormData['adresse'],
        rating: FormData['rating'],
        category_of_worker: FormData['category_of_worker'],
        compte_type: FormData['compte_type'],

    }
    client.post('/api/register/', jas  )
      .then(response => {
        console.log('Registration successful:', response.data);
        // Handle the successful response here
      })
      .catch(error => {
        console.error('Registration failed:', error);
        // Handle the error here
      });
    console.log(jas);
  };

  return (
    <div>
      <h1>Artisan Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" value={FormData.username} onChange={handleChange} required /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={FormData.email} onChange={handleChange} required /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" value={FormData.password} onChange={handleChange} required /><br />

        <label htmlFor="nom">Nom:</label>
        <input type="text" name="nom" id="nom" value={FormData.nom} onChange={handleChange} required /><br />

        <label htmlFor="prenom">Prenom:</label>
        <input type="text" name="prenom" id="prenom" value={FormData.prenom} onChange={handleChange} required /><br />

        <label htmlFor="tel">Tel:</label>
        <input type="tel" name="tel" id="tel" value={FormData.tel} onChange={handleChange} required /><br />

        <label htmlFor="wilaya">Wilaya:</label>
        <input type="text" name="wilaya" id="wilaya" value={FormData.wilaya} onChange={handleChange} required /><br />

        <label htmlFor="commune">Commune:</label>
        <input type="text" name="commune" id="commune" value={FormData.commune} onChange={handleChange} required /><br />

        <label htmlFor="adresse">Adresse:</label>
        <input type="text" name="adresse" id="adresse" value={FormData.adresse} onChange={handleChange} required /><br />

        <label htmlFor="rating">Rating:</label>
        <input type="number" name="rating" id="rating" value={FormData.rating} onChange={handleChange} required /><br />

        <label htmlFor="category_of_worker">Category of Worker:</label>
        <input type="text" name="category_of_worker" id="category_of_worker" value={FormData.category_of_worker} onChange={handleChange} required /><br />

        <input type="submit" value="Register" />
      </form>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> 
    </div>
  );
}

export default Backendtest;
