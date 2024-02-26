import userRequest from "../utils/userRequest";

export const userSignup = (data) => {
    return userRequest.post('/auth/signup',data,{
        withCredentials:true,
    })
}

export async function UserLogin(value) {
    try {
      const data = await userRequest.post("/auth/login", { ...value });
      return data;
    } catch (err) {
      return err;
    }
  }
export async function UserGoogleLogin(value) {
    try {
      const data = await userRequest.post("/auth/googlelogin", { ...value });
      return data;
    } catch (err) {
      return err;
    }
  }

export const UserSignupWithGoogle = (data) =>{
  return userRequest.post('/auth/googleSignup',data,{
    withCredentials:true
  })
} 
export const allDoctors = async ({ filter, search }) => {
  return userRequest.get("/doctors", {
    params: {
      filter,
      search,
    },
  });
};

export const updateProfile =(data,id)=>{
  try {
    const response = userRequest.put(`/profile/${id}`,data,{
      withCredentials:true,
    });
    return response
  } catch (error) {
    console.log(error.message);
  }
}
export const editProfile =(data,id)=>{
  try {
    const response = userRequest.put(`/editProfile/${id}`,data,{
      withCredentials:true,
    });
    return response
  } catch (error) {
    console.log(error.message);
  }
}

export const dpUpdate =(data,id)=>{
  try {
    const response = userRequest.put(`/dp/${id}`,data,{
      withCredentials:true,
      headers:{
        "Content-Type":"multipart/form-data"
      },
    });
    return response
  } catch (error) {
    console.log(error.message);
  }
}
export const getAppointmentsUser = async() =>{
  try {
    const response = await userRequest.get('/appointments', {
      withCredentials: true
    });
    return response
  } catch (error) {
    console.log(error.message);
  }
}

export const cancelAppointment = async({id}) =>{
  try {
    const response = await userRequest.put('/cancelAppointment',{id})
    return response
  } catch (error) {
    console.log(error.mesage);
  }
}

export const prescription = async({id}) =>{
  console.log(id,"api");
  try {
    const response = await userRequest.get(`/prescription/${id}`)
    return response
  } catch (error) {
    console.log(error.message);
  }
}

export const addReview = async(data)=>{
  try {
    const response = await userRequest.post('/review',data)
    return response
  } catch (error) {
    console.log(error.mesage);
  }
}
export const getReview = async(id)=>{
  try {
    
    const response = await userRequest.get(`/review/${id}`)
    return response
  } catch (error) {
    console.log(error.mesage);
  }
}