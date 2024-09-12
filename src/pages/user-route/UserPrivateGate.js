import React, { useEffect } from 'react'
import { isUserLoggedIn } from '../../services/auth';
import { Navigate, Outlet } from 'react-router-dom';
import {toast} from'react-toastify'

function UserPrivateGate() {
    let isLoggedIn = isUserLoggedIn();

    useEffect(() => {
        if (!isLoggedIn)  {
            toast.error("Access denied! Log in to access this page", {
                position: "bottom-center",
                theme: "dark",
            });
        }
    }, [isLoggedIn]);

    return isLoggedIn ? <Outlet></Outlet> : <Navigate to={"/login"}></Navigate>;
}


export default UserPrivateGate;


