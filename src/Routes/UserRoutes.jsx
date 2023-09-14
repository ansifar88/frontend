import React from 'react'
import { Routes , Route } from 'react-router-dom'

import Login from '../pages/User/Login'
import Signup from '../pages/User/Signup'
import Home from '../pages/User/Home'
import UserPublic from '../Protected/UserPublic'
function UserRoutes() {
  return (
    <Routes>
      
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home/>} />

        <Route element={<UserPublic/>}>
          <Route path='/login' element= {<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Route> 

    </Routes>
  )
}

export default UserRoutes
