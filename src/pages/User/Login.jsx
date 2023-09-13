import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {

  Input,
  Button,
  Typography,
  
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-dom/fc'
import { UserLogin } from '../../api/userApi';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setuserdetails } from '../../Redux/UserSlice';

const Login = () =>{
  const navigate = useNavigate()
  const[value,setValue] = useState({email:"",password:""})
  const[guser,setGUser] = useState([])
  const dispatch = useDispatch()

  const Glogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
});

useEffect(
  () => {
      if (guser) {
          axios
              .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`, {
                  headers: {
                      Authorization: `Bearer ${guser.access_token}`,
                      Accept: 'application/json'
                  }
              })
              .then((res) => {
                
                UserLogin({email:res.data.email,password:res.data.id}).then((response)=>{
                  if(response.data.access){
                    const userDetails = {
                      name:response.data.user.name,
                      email:response.data.user.email,
                    }
                    dispatch(setuserdetails({userInfo : userDetails}))
                    localStorage.setItem("currentUser",response.data.token)
                    navigate('/')
                  }
                })
              })
              .catch((err) => console.log(err));
      }
  },
  [ guser ]
)

    const handleSubmit = async (e)=>{
      e.preventDefault()
      const {email,password} = value
      try {
        if(!email){
          console.log("email cant be empty");
        }else if(!password){
          console.log("password cant be blank");
        }else{
          const response = await UserLogin(value)
          console.log(response);
          if (response.data.access) {
            localStorage.setItem("currentUser", response.data.token)
                    navigate("/")
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  
  return (
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
  }}
>
      <div className="w-full max-w-[48rem] p-4 ">   
        <div className="bg-transparent shadow-lg rounded-none overflow-hidden ">
          <div className="md:flex">
            <div className=" md:w-2/5 bg-cover bg-center h-96 bg-[#1a96de71] flex items-center justify-center">
              <img
                src="../../../public/logoImages/logonobackground.png"
                alt="card-image"
                className=" object-contain w-6/12 sm:w-4/12 max-w-screen-sm:w-6/12 lg:w-3/4"
              />
            </div>
            <div className="p-6 flex flex-col bg-[#0c486b8a] justify-center items-center">
              <Typography variant="h4" color="white" className="text-center mb-4 md:mb-8">
                LOG IN
              </Typography>
              
              <form className="w-full md:w-96" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Input size="lg" label="Email" variant="standard" name='email' color='white' className='bg-[#1572a9b6]' onChange={(e)=> {setValue({...value,[e.target.name]:e.target.value})}}/>
                </div>
                <div className="mb-4">
                  <Input type="password" size="lg" label="Password" variant="standard" name='password' color='white' className='bg-[#1572a9b6]' onChange={(e)=>{setValue({...value,[e.target.name] : e.target.value})}} />
                </div>
                <div className="flex items-start justify-between">
                
                <Button className="mt-4" color="blue" onClick={() => Glogin()}>
                Sign in with GOOGLE
                {/* <span> <img src="../../../public/logoImages/7123025_logo_google_g_icon.svg" className='w-12' alt="" /></span> */}
                </Button>
                <Button className="mt-4" type='submit' variant="gradient" color="blue">
                Login
                </Button>
                </div>
                <Typography color="white" className="mt-4 text-center font-normal">
                  Don't have an account ?{" "}
                  <Link to={'/signup'} className="font-medium text-gray-900">
                   Sign up
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
