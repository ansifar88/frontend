import axios from 'axios'
const baseUrl = import.meta.env.VITE_USERURL
import {GenerateError} from "../toast/GenerateError"
const userRequest = axios.create({
    baseURL: baseUrl
})

userRequest.interceptors.request.use((req)=> {
    if(localStorage.getItem("currentUser")){
        req.headers.authorization = "Bearer " + localStorage.getItem("currentUser")
    }
    return req
})

userRequest.interceptors.response.use((response)=>
    response,(error)=>{
        if(error.response && error.response.status === 401){
            GenerateError(error.response.data.message)
            setTimeout(()=>{
                localStorage.removeItem("currentUser")
                window.location = "/login"
            },2000)
        }else if(error.response && error.response.status === 403){
            GenerateError(error.response.data.message)
            setTimeout(()=>{
                localStorage.removeItem("currentUser")
                window.location = "/login"
            },2000)
        }
    }
)
export default userRequest