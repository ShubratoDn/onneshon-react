import axios from "axios";

export const BASE_URL = "http://localhost:1234";

export const axiosRequest = axios.create({
    baseURL: BASE_URL
});


export const privateAxiosRequest = axios.create({})
