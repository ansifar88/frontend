import React from 'react'
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import DoctorRoutes from './Routes/DoctorRoutes'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ChatUserProvider from './components/user/Chat/components/Context/ChatProvider'
import ChatProvider from './components/doctor/Chat/Components/Context/ChatProvider'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/*' element={<ChatUserProvider><UserRoutes/></ChatUserProvider>} />
            <Route path='/doctor/*' element={<ChatProvider><DoctorRoutes/></ChatProvider>} />
            <Route path='/admin/*' element={<AdminRoutes/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
