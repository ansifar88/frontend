import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/Doctor/Signup'
import Login from '../pages/Doctor/Login'
import DoctorPublic from '../Protected/DoctorPublic'
import DoctorProtected from '../Protected/DoctorProtected'
import Layout from '../pages/Doctor/Layout'
import Dashboard from '../pages/Doctor/Dashboard'
import Profile from '../components/doctor/Profile'
import { Slot } from '../components/doctor/Slot'
import ChatList from '../components/doctor/Chat/ChatList'

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
          <Route path='/profile' element={<Profile />} />
          <Route path='/slot' element={<Slot/>} />
          <Route path='/chats' element={<ChatList/>} />

          
        </Route>
      </Route>
    </Routes>
  )
}

export default DoctorRoutes
