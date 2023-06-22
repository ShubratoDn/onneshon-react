import React, { useEffect } from 'react'
import { isUserLoggedIn } from '../../services/auth';
import { Navigate, Outlet } from 'react-router-dom';
import {toast} from'react-toastify'

const BlogPrivateGate =()=> {
    let isLoggedIn = isUserLoggedIn();

    useEffect(() => {
        if (!isLoggedIn)  {
            toast.error("You have to be logged in vai.", {
                position: "bottom-center",
                theme: "dark",
            });
        }
    }, [isLoggedIn]);

    return isLoggedIn ? <Outlet></Outlet> : <Navigate to={"/login"}></Navigate>;
}


//NORMAL VABE KORLEO HOBE
// Higher-level component or route that ensures BlogPrivateGate is rendered only once
const ProtectedBlogRoute = () => {
    return <BlogPrivateGate />;
  };
  
export default ProtectedBlogRoute;