import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/Doctor/Signup'
import Login from '../pages/Doctor/Login'
import DoctorPublic from '../Protected/DoctorPublic'
import DoctorProtected from '../Protected/DoctorProtected'
import Layout from '../pages/Doctor/Layout'
import Dashboard from '../pages/Doctor/Dashboard'
import Profile from '../components/doctor/Profile'

function DoctorRoutes() {
  return (


    <Routes>
      <Route element={<DoctorPublic />}>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
      </Route>
      <Route element={<DoctorProtected />} >
        <Route path='/' element={<Layout></Layout>} >
          <Route index element={<Dashboard />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default DoctorRoutes
