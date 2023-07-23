import { client } from '../App' 

 
export  function isLoggedIn() {
    try { 
      const token = localStorage.getItem('accessToken');
      if (!token) { 
        return false;
      } 
      const decodedPayload = JSON.parse(atob(token.split('.')[1]));
      const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
      const isTokenExpired = decodedPayload.exp < currentTimestampInSeconds;
 
      return !isTokenExpired;
    } catch (error) { 
      return false;
    }
  }
  
  
export async function Logedininfo() {
  try {
    // Get the JWT token from local storage
    const token = localStorage.getItem('accessToken');
    if (!token) { 
      return null;
    }

    const headers = { Authorization: `Bearer ${token}` };
    // Make the authenticated API request to get user data
    const response = await client.get('/api/user-data/', { headers }); 
    return response.data;
  } catch (error) {
    // If there's an error, user is not logged in
    return null;
  }
}
