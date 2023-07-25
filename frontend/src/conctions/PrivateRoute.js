
import AuthContext from './AuthContext'


import React ,{useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => { 
    let {user} = useContext(AuthContext)
    // determine if authorized, from context or however you're doing it
    
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return !user ? <Navigate to="/connection" /> :   <Outlet />};
    export default PrivateRoute;