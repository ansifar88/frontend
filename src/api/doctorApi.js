import doctorRequest from "../utils/doctorRequest";

export const doctorSignup = (data)=>{
    return doctorRequest.post('/docAuth/signup',data,{
        withCredentials:true
    })
}

export async function DoctorLogin(value) {
    try {
      const data = await doctorRequest.post("/docAuth/login", { ...value });
      return data;
    } catch (err) {
      return err;
    }
  }
export const DoctorSignupWithGoogle = (data) => {
    return doctorRequest.post('/docAuth/googleSignup',data,{
        withCredentials:true
    })
}

export const updateProfile =(data,id)=>{
  try {
    const response = doctorRequest.put(`/profile/${id}`,data,{
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
export const dpUpdate =(data,id)=>{
  try {
    const response = doctorRequest.put(`/dp/${id}`,data,{
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