import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Signup from '../pages/Doctor/Signup'
import Login from '../pages/Doctor/Login'
import Home from '../pages/Doctor/Home'

function DoctorRoutes() {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/> } />
    </Routes>
  )
}

export default DoctorRoutes
