import React, { useEffect, useState } from 'react';
import {

  Input,
  Button,
  Typography,
  
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdminLogin } from '../../api/adminApi';
import { LoginSchema } from '../../yup/validation';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { GenerateError } from '../../toast/GenerateError';

const Login = () =>{
  const navigate = useNavigate()
  const[value,setValue] = useState({email:"",password:""})
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
      const response = await AdminLogin(values)
      if (response.data.access) {
        localStorage.setItem("currentAdmin", response.data.token)
                navigate("/admin")
      }else{
        GenerateError(response.data.message)
      }
    }
  })
 

  
  return (
    <>
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1474377207190-a7d8b3334068?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
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
                ADMIN LOG IN
              </Typography>
              
              <form className="w-full md:w-96" onSubmit={handleSubmit}>
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
                  <Input type="password" size="lg" label="Password" variant="standard" name='password' color='white' className='bg-[#1572a9b6]' 
                   onChange={handleChange} 
                   onBlur={handleBlur}
                   value={values.password} 
                   />
                   {touched.password && errors.password && (
                      <div className="text-red-500 text-sm ">{errors.password}</div>
                    )}
                </div>
                <div className="flex items-start justify-end">
                
              
                <Button className="mt-4" type='submit' variant="filled" color="blue">
                Login
                </Button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}

export default Login;
