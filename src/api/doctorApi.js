import doctorRequest from "../utils/doctorRequest";

export const doctorSignup = (data)=>{
  console.log(data,"doctor signup data");
    return doctorRequest.post('/docAuth/signup',data,{
        withCredentials:true
    })
}

export async function DoctorLogin(value) {
    try {
      console.log(value,"doctor login data");
      const data = await doctorRequest.post("/docAuth/login", { ...value });
      return data;
    } catch (err) {
      return err;
    }
  }
export const DoctorSignupWithGoogle = (data) => {
  console.log(data,"doctor google signup data");

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
export const editProfile =(data,id)=>{
  try {
    const response = doctorRequest.put(`/editprofile/${id}`,data,{
      withCredentials:true,
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

export const setSlot = (data)=>{
  try {
    const response = doctorRequest.post(`/addslots`,data,{
      withCredentials:true
    })
    return response
  } catch (error) {
    console.log(error.message);
  }
}
export const ShareVideoLink = (data) =>{
  try {
    const response = doctorRequest.post(`/sharelink`,data,{
      withCredentials:true
    })
    return response
  } catch (error) {
    console.log(error.message);
  }
}

export const addPrescription = (data)=>{
  try {
    const response  = doctorRequest.post('/addprescription',data)
    return response
  } catch (error) {
    console.log(error.message);
  }
}

export const confirmCunsult = async(id) =>{
  try {
    const response = await doctorRequest.put(`/confirm/${id}`)
    return response
  } catch (error) {
    console.log(error.message);
  }
}

export const dashBoard = async () =>{
  try {
    const res = doctorRequest.get('/dasboard')
    return res
  } catch (error) {
    console.log(error.message);
  }
}