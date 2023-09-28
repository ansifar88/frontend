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
          <Route exact path='/doctorr/:id' element={<DoctorSingle/>} />
          <Route path='/doctors' element={<Doctors />} />
         

        </Route>
      </Route>
    </Routes>

  )
}

export default UserRoutes
