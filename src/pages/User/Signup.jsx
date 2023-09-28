import React, { useState ,  useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
// import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setuserdetails } from '../../Redux/UserSlice';
import { ToastContainer } from 'react-toastify';
import { GenerateError , GenerateSuccess } from '../../toast/GenerateError';

import {

  Input,
  Button,
  Typography,
  
} from "@material-tailwind/react";
import { userSignup ,UserSignupWithGoogle} from '../../api/userApi';
import { SignupSchema } from '../../yup/validation';
import { useFormik } from 'formik';

 

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
    setValues
  } = useFormik({
    initialValues : initialValues,
    validationSchema : SignupSchema,
    onSubmit : async(values , { resetForm }) => {
      const response = await userSignup(values)
      if(response.data.created){
        resetForm(initialValues);
        GenerateSuccess(response.data.message);
      }else{
        resetForm(initialValues);
        GenerateError(response.data.message);
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
                UserSignupWithGoogle(res.data).then((response)=>{
                  if(response.data.created){
                    console.log(response);
                    const userDetails = {
                      name:response.data.user.name,
                      email:response.data.user.email,
                    }
                    localStorage.setItem("currentUser",response.data.token)
                    dispatch(setuserdetails({userInfo : userDetails}))
                    navigate('/')
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

  return (
    <>
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
  }}
>

      <div className="w-full max-w-[48rem] p-4 ">   
        <div className="bg-transparent shadow-lg rounded-none overflow-hidden ">
          <div className="md:flex ">
            <div className="md:w-2/5 bg-cover bg-center bg-[#1a96de5e] flex items-center justify-center">
              <img
                src="../../../public/logoImages/logonobackground.png"
                alt="card-image"
                className="m-9 object-contain w-6/12 sm:w-6/12 max-w-screen-sm:w-6/12 lg:w-3/4"
              />
            </div>
            <div className="p-6 flex flex-col bg-[#0c486b8a] justify-center items-center bg-blur backdrop-blur-lg">
              <Typography variant="h4" color="white" className="text-center mb-4 md:mb-8">
                SIGN UP
              </Typography>
              
              <form className="w-full md:w-96" onSubmit={handleSubmit}>
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
                <Button className="mt-4" variant="gradient" type='submit' color="blue">
                Sign up
                </Button>
                </div>
                <Typography color="white" className="mt-4 text-center font-normal">
                  Already have an account ?{"  "}
                  <Link to={'/login'} className="font-medium text-gray-900">
                    Login
                  </Link>
                </Typography>
                <Typography color="white" className="mt-4 text-center font-normal">
                  Are you a Doctor ?{"  "}
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
  );
}

export default Signup;
