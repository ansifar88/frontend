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