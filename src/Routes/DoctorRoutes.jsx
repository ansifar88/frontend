import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Signup from '../pages/Doctor/Signup'
import Login from '../pages/Doctor/Login'
import Home from '../pages/Doctor/Home'
import DoctorPublic from '../Protected/DoctorPublic'
import DoctorProtected from '../Protected/DoctorProtected'

function DoctorRoutes() {
  return (
    <Routes>
      <Route element={<DoctorPublic/>} >
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Login/> } />
      </Route>  

      <Route element={<DoctorProtected/>} >
        <Route path='/home' element={<Home/> } />
      </Route>
        
    </Routes>
  )
}

export default DoctorRoutes
