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