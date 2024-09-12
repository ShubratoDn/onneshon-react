import axios from "axios";

// export const BASE_URL = "http://localhost:1234";
export const BASE_URL = "http://127.0.0.1:1234";
// export const BASE_URL = "http://192.168.0.13:1234";

export const axiosRequest = axios.create({
    baseURL: BASE_URL
});


export const privateAxiosRequest = axios.create({})
