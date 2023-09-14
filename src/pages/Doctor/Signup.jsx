import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doctorSignup } from '../../api/doctorApi';
import { DoctorSignupWithGoogle } from '../../api/doctorApi';
import { setdoctordetails } from '../../Redux/DoctorSlice';
import { useDispatch } from 'react-redux';
import { SignupSchema } from '../../yup/validation';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { GenerateError } from '../../toast/GenerateError';

import {
    Input,
    Button,
    Typography,    
  } from "@material-tailwind/react";
  

function Signup() {
    const navigate = useNavigate()
    const[value,setValue] = useState({name:'',mobile:'',email:'',password:''})
    const [ guser, setGUser ] = useState([]);
    const dispatch = useDispatch()

    const initialValues = {
      name: "",
      email : "",
      mobile : "",
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
      initialValues : initialValues,
      validationSchema : SignupSchema,
      onSubmit : async(values) => {
        const response = await doctorSignup(values)
        if (response.data.created) {
          localStorage.setItem("currentDoctor",response.data.token)
          navigate("/doctor/home")
      }else{
        GenerateError(response.data.message)
      }
      }
    })

    const Gsignup = useGoogleLogin({
      onSuccess: (codeResponse) => setGUser(codeResponse),
      onError: (error) => console.log('Signup Failed:', error)
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
                  DoctorSignupWithGoogle(res.data).then((response)=>{
                    if(response.data.created){
                      console.log(response);
                      const doctorDetails = {
                        name:response.data.doctor.name,
                        email:response.data.doctor.email,
                      }
                      localStorage.setItem("currentDoctor",response.data.token)
                      dispatch(setdoctordetails({doctorInfo : doctorDetails}))
                      navigate('/doctor/home') 
                    }else{
                      GenerateError(response.data.message)
                    }
                  })
                })
                .catch((err) => console.log(err));
        }
    },
    [ guser ]
  );
    // const handleSubmit = async(e)=>{
    //     e.preventDefault()
    //     const {name,email,mobile,password} = value
    //     try {
    //         if (!name) {
    //             console.log('Name is required');
    //           }else if(!email){
    //             console.log("Email is required");
    //           }else if(!mobile){
    //             console.log("Mobile is required");
    //           }else if(!password){
    //             console.log("Password is required");
    //           }else{
    //             const response = await doctorSignup(value)
    //             if (response.data.created) {
    //                 localStorage.setItem("currentDoctor",response.data.token)
    //                 navigate("/doctor/home")
    //             }
                
    //           }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }
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
                SIGN UP
              </Typography>
              
              <form className="xl:w-1/2 md:w-2/3 sm:w-2/3" onSubmit={handleSubmit} >
                <div className="mb-4">
                  <Input size="lg" label="Name" variant="standard" name='name' color='white' className='bg-[#1572a9b6] ' 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}                  
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-500 text-sm ">{errors.name}</div>
                  )}
                </div>
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
                  <Input size="lg" label="Mobile" variant="standard" name='mobile' type='number' color='white' className='bg-[#1572a9b6]' 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobile}                  
                  />
                  {touched.mobile && errors.mobile && (
                    <div className="text-red-500 text-sm ">{errors.mobile}</div>
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
                
                <Button className="mt-4" color="blue" onClick={() => Gsignup()} >
                Sign in with GOOGLE
                {/* <span> <img src="../../../public/logoImages/7123025_logo_google_g_icon.svg" className='w-12' alt="" /></span> */}
                </Button>
                <Button className="mt-4 text-white bg-476e83" variant='outlined'  type='submit' >
                Sign up
                </Button>
                </div>
                <Typography color="white" className="mt-4 text-center font-normal">
                  Already have an account ?{"  "}
                  <Link to={'/doctor/login'} className="font-medium text-gray-900">
                    Login
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

export default Signup
