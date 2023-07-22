import { client } from '../App' 

 
export async function isLoggedIn() {
    try {
      // Get the JWT token from local storage
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // Token doesn't exist, user is not logged in
        return false;
      }
  
      const headers = { Authorization: `Bearer ${token}` };
      // Make the authenticated API request to get user data
      const response = await client.get('/api/user-data/', { headers });
  
      // Assuming the request was successful, user is logged in
      return true;
    } catch (error) {
      // If there's an error, user is not logged in
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

    // Assuming the request was successful, user is logged in
    return response.data;
  } catch (error) {
    // If there's an error, user is not logged in
    return null;
  }
}