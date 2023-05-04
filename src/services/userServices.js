import { axiosRequest } from "../utils/constants"

export const userSignUp = async (data) => {

    let image = data.image;
    console.log(image)
    console.log("\n\n\n\n")

    delete data.image;    

    const formData = new FormData();
    formData.append('userData', JSON.stringify(data));
    formData.append('image', image);


    return await axiosRequest.post("/api/v1/auth/register", formData)
        .then((resp) => resp.json);

}