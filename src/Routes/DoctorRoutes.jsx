import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/Doctor/Signup'
import Login from '../pages/Doctor/Login'
import DoctorPublic from '../Protected/DoctorPublic'
import DoctorProtected from '../Protected/DoctorProtected'
import Layout from '../pages/Doctor/Layout'
// import Profile from '../components/doctor/Profile'
import { Slot } from '../components/doctor/Slot'
import ChatList from '../components/doctor/Chat/ChatList'
import Room from '../components/doctor/Room'
import Profile from '../components/doctor/Profile'
import Dashboard from '../components/doctor/Dashboard'
import NotFound from '../components/common/doctor/NotFound'
// import Dashboard from '../components/doctor/Dashboard'



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
      {/* <Route path='/' element={<Layout></Layout>} > */}
      <Route path='/room/:roomId' element={<Room/>} />
      {/* </Route> */}
      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default DoctorRoutes
