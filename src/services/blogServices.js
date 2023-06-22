import {axiosRequest} from "../utils/constants"
import { getToken } from "./auth"


//get all user blogs 
export const getBlogsByUserId = async (userId) =>{
    return await axiosRequest.get("/api/user/"+userId+"/blogs?pageSize=100")
                    .then((response)=>response.data)
}

export const getAllCategories = async ()=>{
    return await axiosRequest.get("/api/category/all")
                    .then((response)=>response.data)
}


//add new blog
export const addNewBlog = async (data) =>{

    let image = data.blogImage;

    delete data.blogImage;

    let token  = getToken();    

    const formData = new FormData();
    formData.append("blogData", JSON.stringify(data));
    formData.append("blogImage", image)

    return await axiosRequest.post("/api/blog", formData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=> response)
}