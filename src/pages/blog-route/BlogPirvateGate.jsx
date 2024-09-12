import React, { useState } from 'react'
import { isUserLoggedIn } from '../../services/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify'

const BlogPrivateGate = () => {    
    const [isLoggedIn, setLoggedIn] = useState(isUserLoggedIn());

    if (!isLoggedIn) {
        toast.error("Access denied! Log in to access this page", {
            position: "bottom-center",
            theme: "dark",
        });
    }
    
    return isLoggedIn ? <Outlet></Outlet> : <Navigate to={"/login"}></Navigate>;
}
export default BlogPrivateGate
