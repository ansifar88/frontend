import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { DoctorLogin } from '../../api/doctorApi';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import {
    Input,
    Button,
    Typography, 
  } from "@material-tailwind/react";
  import{ setdoctordetails } from '../../Redux/DoctorSlice'
  import { LoginSchema } from '../../yup/validation';
  import { useFormik } from 'formik';
  import { ToastContainer } from 'react-toastify';
import { GenerateError } from '../../toast/GenerateError';


function Login() {
    const[value,setValue] = useState({email:'',password:''})
    const[guser,setGUser] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
      email : "",
      password : ""
    }
    const {
      values,
      errors,
      touched,
      handleBlur,
      handleSubmit,
      handleChange,
      setFieldValue,
    } = useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values) =>{
        const response = await DoctorLogin(values)
        console.log(response);
        if (response.data.access) {
          localStorage.setItem("currentDoctor", response.data.token)
                  navigate("/doctor")
        }else{
          GenerateError(response.data.message)
        }
      }
    })
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
                  
                  DoctorLogin({email:res.data.email,password:res.data.id}).then((response)=>{
                    if(response.data.access){
                      const doctorDetails = {
                        name:response.data.doctor.name,
                        email:response.data.doctor.email,
                      }
                      dispatch(setdoctordetails({doctorInfo : doctorDetails}))
                      localStorage.setItem("currentDoctor",response.data.token)
                      navigate('/doctor')
                    }else{
                      GenerateError(response.data.message)
                    }
                  })
                })
                .catch((err) => console.log(err));
        }
    },
    [ guser ]
  )

  return (
    <>
      <div
  className="min-h-screen  bg-cover bg-center"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
  }}
>
      <div className="w-full">   
        <div className="bg-transparent shadow-lg rounded-none overflow-hidden ">
          <div className="md:flex ">
            <div className="md:w-2/4 bg-cover bg-center bg-[#476e83a7] flex items-center justify-center">
              <img
                src="../../../public/logoImages/logonobackground.png"
                alt="card-image"
                className="m-9 object-contain w-6/12 sm:w-6/12 max-w-screen-sm:w-6/12 lg:w-2/4"
              />
            </div>
            <div className="p-6 w-full md:w-2/4 h-screen flex flex-col bg-[#476e83a7] justify-center items-center">


              <Typography variant="h4" color="white" className="text-center mb-4 md:mb-8">
                LOG IN
              </Typography>
              
              <form className="xl:w-1/2 md:w-2/3 sm:w-2/3" onSubmit={handleSubmit} >
                
                <div className="mb-4">
                  <Input size="lg" label="Email" variant="standard" name='email' color='white' className='bg-[#1572a9b6]' 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-sm ">{errors.email}</div>
                  )}
                </div>
               
                <div className="mb-4">
                  <Input type="password" size="lg" variant="standard" name='password' label="Password" color='white' className='bg-[#1572a9b6]' 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  value={values.password}
                  />
                  {touched.password && errors.password && (
                      <div className="text-red-500 text-sm ">{errors.password}</div>
                  )}
                </div>
                <div className="flex items-start justify-between">
                
                <Button className="mt-4" color="blue" onClick={() => Glogin()} >
                Sign in with GOOGLE
                {/* <span> <img src="../../../public/logoImages/7123025_logo_google_g_icon.svg" className='w-12' alt="" /></span> */}
                </Button>
                <Button className="mt-4" variant="gradient" type='submit' color="blue">
                LOGIN
                </Button>
                </div>
                <Typography color="white" className="mt-4 text-center font-normal">
                  Dont have an account ?{"  "}
                  <Link to={'/doctor/signup'} className="font-medium text-gray-900">
                    Sign up
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Login
