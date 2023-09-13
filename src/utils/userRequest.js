import axios from 'axios'
const userRequest = axios.create({
    baseURL: 'http://localhost:8801'
})

userRequest.interceptors.request.use((req)=> {
    if(localStorage.getItem("currentUser")){
        req.headers.Authorization = "Bearer" + localStorage.getItem("currentUser")
    }
    return req
})
export default userRequest