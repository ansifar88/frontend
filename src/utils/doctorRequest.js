import axios from 'axios'
const baseUrl = import.meta.env.VITE_DOCTORURL

const doctorRequest = axios.create({
    baseURL: baseUrl
})

doctorRequest.interceptors.request.use((req)=> {
    if(localStorage.getItem("currentDoctor")){
        req.headers.Authorization = "Bearer" + localStorage.getItem("currentDoctor")
    }
    return req
})
export default doctorRequest