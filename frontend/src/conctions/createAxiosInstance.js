import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

const  createAxiosInstance = () => {
  const baseURL = 'http://127.0.0.1:8000'; // Replace with your actual base URL
  const authTokens = JSON.parse(localStorage.getItem('authTokens')) || null;

  const client = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${authTokens?.access}`}
  });

  client.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }

    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
        refresh: authTokens.refresh
      });

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})


  return client;
};


export default createAxiosInstance;