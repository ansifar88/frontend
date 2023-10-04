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

export const UserSignupWithGoogle = (data) =>{
  return userRequest.post('/auth/googleSignup',data,{
    withCredentials:true
  })
} 

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