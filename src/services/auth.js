

//for setting user data
export const doLogin = (data, next) =>{
    localStorage.setItem("data",JSON.stringify(data));
    next();
}


//for logout
export const doLogout = (next) =>{
    localStorage.removeItem("data");
    next();
}


//check if login or not
export const isUserLoggedIn = () =>{
    let data = localStorage.getItem("data");
    if(data != null){
        return true;
    }else{
        return false;
    }
}


//get current user info
export const getCurrentUserInfo = ()=>{
    if(isUserLoggedIn){
        let data = JSON.parse(localStorage.getItem("data")).user;
        return data;
    }else{
        return null;
    }
}

