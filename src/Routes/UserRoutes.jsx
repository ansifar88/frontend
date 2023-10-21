import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from '../pages/User/Login'
import Signup from '../pages/User/Signup'
import Home from '../pages/User/Home'
import UserPublic from '../Protected/UserPublic'
import UserProtected from '../Protected/UserProtected'
import Layout from '../pages/User/Layout'
import Banner from '../components/user/Banner'
import { Doctors } from '../components/user/Doctors'
import { DoctorSingle } from '../components/user/DoctorSingle'
import Profile from '../components/user/Profile'
import { Success } from '../components/user/Success'
import { Appointments } from '../components/user/Appointments'
import ChatList from '../components/user/Chat/ChatList'

function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserPublic />} >
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
      </Route>
      <Route element={<UserProtected />} >
        <Route path='/' element={<Layout></Layout>}>

          <Route index element={<Banner />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route exact path='/doctorview' element={<DoctorSingle/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/success' element={<Success />} />
          <Route path='/appointments' element={<Appointments/>} />
          <Route path='/chats' element={<ChatList/>} />
         

        </Route>
      </Route>
    </Routes>

  )
}

export default UserRoutes
