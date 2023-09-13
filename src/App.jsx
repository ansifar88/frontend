import React from 'react'
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import DoctorRoutes from './Routes/DoctorRoutes'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/*' element={<UserRoutes/>} />
            <Route path='/doctor/*' element={<DoctorRoutes/>} />
            <Route path='/admin/*' element={<AdminRoutes/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
