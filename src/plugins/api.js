import axios from "axios";

export const HOST = "http://127.0.0.1:8000"

export const api = axios.create({
    baseURL: `${HOST}/api`,
    // timeout: 20000,
    // headers:{
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //   // Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
    // }
})

export const authToken = function () {
    
  };