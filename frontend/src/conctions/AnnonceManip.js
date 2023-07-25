
import { client } from '../App' 

export   function annonceInfo() {
    try {
   
      // Make the authenticated API request to get user data
      const response = client.get('/api/Annonce/');  
      return response.data;
    } catch (error) {
      // If there's an error, user is not logged in
      return null;
    }
  }

 