import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../Login';

const UserPrivateGate =()=> {
    let isLoggedIn = true;

    return isLoggedIn ?  <Outlet></Outlet> : <Navigate to={"/login"}></Navigate>;
}

export default UserPrivateGate;
