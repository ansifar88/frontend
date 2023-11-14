import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import google from '../../logos/google.png'
import { UserGoogleLogin, UserLogin } from '../../api/userApi';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setuserdetails } from '../../Redux/UserSlice';
import { LoginSchema } from '../../yup/validation';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';
import { GenerateError } from '../../toast/GenerateError';
import vclogo from '../../logos/logonobackground.png'
const Login = () => {
  const navigate = useNavigate()
  const [guser, setGUser] = useState([])
  const dispatch = useDispatch()
  const initialValues = {
    email: "",
    password: ""
  }
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const response = await UserLogin(values)
      console.log(response);
      if (response.data.access) {
        const userDetails = {
          name: response.data.user.name,
          email: response.data.user.email,
          id: response.data.user._id,
        }
        dispatch(setuserdetails({ userInfo: userDetails }))
        localStorage.setItem("currentUser", response.data.token)
        navigate("/")
      } else {
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
            UserGoogleLogin({ email: res.data.email, password: res.data.id }).then((response) => {
              if (response.data.access) {
                const userDetails = {
                  name: response.data.user.name,
                  email: response.data.user.email,
                  id: response.data.user._id,
                }
                dispatch(setuserdetails({ userInfo: userDetails }))
                localStorage.setItem("currentUser", response.data.token)

                navigate('/')
              } else {
                GenerateError(response.data.message)
              }
            })
          })
          .catch((err) => console.log(err));
      }
    },
    [guser]
  )

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
            <div className="md:flex">
              <div className=" md:w-2/5 bg-cover bg-center h-96 bg-[#1a96de71] flex items-center justify-center">
                <img
                  src={vclogo}
                  alt="card-image"
                  className=" object-contain w-6/12 sm:w-4/12 max-w-screen-sm:w-6/12 lg:w-3/4"
                />
              </div>
              <div className="p-6 flex flex-col bg-[#0c486b8a] justify-center items-center bg-blur backdrop-blur-lg">
                <Typography variant="h4" color="white" className="text-center mb-4 md:mb-8">
                  LOG IN
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
                  <div className="flex items-start justify-between">
                    <img src={google} className='h-12 w-12 mt-4 cursor-pointer rounded-full bg-white hover:bg-blue-gray-900 p-2' onClick={() => Glogin()} />
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
                  <Typography color="white" className="mt-4 text-center font-normal">
                    Are You a Doctor ?{" "}
                    <Link to={'/doctor/login'} className="font-medium text-gray-900">
                      Log In
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
