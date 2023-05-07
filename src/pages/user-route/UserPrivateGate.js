import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isUserLoggedIn } from '../../services/auth';

const UserPrivateGate =()=> {
    let isLoggedIn = isUserLoggedIn();

    return isLoggedIn ?  <Outlet></Outlet> : <Navigate to={"/login"}></Navigate>;
}

export default UserPrivateGate;
