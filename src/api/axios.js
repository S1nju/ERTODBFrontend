import axios from "axios";
import { baseurl } from "./api";

import Cookie from 'cookie-universal'
 const cookie = Cookie()
export const Axios = axios.create({
    baseURL: baseurl,
    headers:{
        'Content-Type': 'application/json',

        Authorization:'Bearer '+cookie.get('token')
    }

}
    
   )
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      Cookies.remove("token"); // Remove the token
      console.log("Token has expired and has been removed.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

