import axios from 'axios'
const doctorRequest = axios.create({
    baseURL: 'http://localhost:8801/'
})

doctorRequest.interceptors.request.use((req)=> {
    if(localStorage.getItem("currentDoctor")){
        req.headers.Authorization = "Bearer" + localStorage.getItem("currentDoctor")
    }
    return req
})
export default doctorRequest