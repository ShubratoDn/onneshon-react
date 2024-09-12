import {axiosRequest} from "../utils/constants"
import { getToken } from "./auth"


//get all blogs for NewsFeed
export const getAllBlogs = async(pageNumber, pageSize)=>{
    return await axiosRequest.get(`/api/blogs?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((response)=>response.data)
}



//get all user blogs 
export const getBlogsByUserId = async (userId) =>{
    return await axiosRequest.get("/api/user/"+userId+"/blogs?pageSize=100")
                    .then((response)=>response.data)
}

//get all categories
export const getAllCategories = async ()=>{
    return await axiosRequest.get("/api/category/all")
                    .then((response)=>response.data)
}


//add new blog
export const addNewBlog = async (data) =>{

    let image = data.blogImage;
    delete data.blogImage;

    let category = data.categoryTitle;
    delete data.categoryTitle;

    const newCategory = {
        category: {
            categoryTitle: category
        }
    };

      // Add the new category data to the existing data object
      const updatedData = {
        ...data,
        ...newCategory
    };


    let token  = getToken();   
    
    

    const formData = new FormData();
    formData.append("blogData", JSON.stringify(updatedData));
    formData.append("blogImage", image)

    return await axiosRequest.post("/api/blog", formData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=> response)
}

//get blog by blog id
export const getBlogByBlogId = async (blogId)=>{
    return await axiosRequest.get("/api/blog/"+blogId)
        .then((response)=>response.data)
}

//add new comments
export const addNewComment = async (blogId,comment) =>{
    let token  = getToken();   

    const formData = new FormData();
    formData.append("content", comment);

    return await axiosRequest.post("api/blog/"+blogId+"/comment", formData, {
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(response=>response.data)
}


//search blog by title
export const searchBlogByTitle = async (query)=>{
    return await axiosRequest.get("/api/blogs/results?search_query="+query)
        .then(resp=>resp.data);
}