import axios from 'axios'
const baseUrl = import.meta.env.VITE_USERURL
const userRequest = axios.create({
    baseURL: baseUrl
})

userRequest.interceptors.request.use((req)=> {
    if(localStorage.getItem("currentUser")){
        req.headers.Authorization = "Bearer" + localStorage.getItem("currentUser")
    }
    return req
})
export default userRequest