import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from '../pages/Admin/Login'
import Home from '../pages/Admin/Home'
import AdminPublic from '../Protected/AdminPublic'
import AdminProtected from '../Protected/AdminProtected'
function AdminRoutes() {
  return (
    <>
      <Routes>

        <Route element={<AdminPublic/>} >
          <Route path='/' element={<Login/> } />
          <Route path='/login' element={<Login/> } />
        </Route>

        <Route element={<AdminProtected/>} >
          <Route path='/home' element={<Home/> } />
        </Route>
        
      </Routes>
    </>
  )
}

export default AdminRoutes
