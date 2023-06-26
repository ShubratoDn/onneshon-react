import { axiosRequest } from "../utils/constants"


//user Signup service
export const userSignUp = async (data) => {

    let image = data.image;
    // console.log(image)
    // console.log("\n\n\n\n")

    delete data.image;

    const formData = new FormData();
    formData.append('userData', JSON.stringify(data));
    formData.append('image', image);


    return await axiosRequest.post("/api/v1/auth/register", formData)
        .then((resp) => resp);

}


//user login service
export const userLogin = async (loginDetails) => {
    // document.cookie = `jwt=${token}; HttpOnly; Secure`; 
    return await axiosRequest.post("/api/v1/auth/login", loginDetails)
        .then((response) => response.data)

}


export const getUserById = async (userId) => {

    return await axiosRequest.get("/api/user/" + userId)
        .then((response) => response.data)

}



