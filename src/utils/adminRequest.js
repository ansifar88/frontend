import axios from 'axios'
const baseUrl = import.meta.env.VITE_ADMINURL

const adminRequest = axios.create({
    baseURL: baseUrl
})

adminRequest.interceptors.request.use((req)=> {
    if(localStorage.getItem("currentAdmin")){
        req.headers.Authorization = "Bearer" + localStorage.getItem("currentAdmin")
    }
    return req
})
export default adminRequest
