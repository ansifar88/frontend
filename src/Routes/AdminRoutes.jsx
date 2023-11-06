import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Admin/Login'
import AdminPublic from '../Protected/AdminPublic'
import AdminProtected from '../Protected/AdminProtected'
import Layout from '../pages/Admin/Layout'
import { Users } from '../components/admin/Users'
import { Department } from '../components/admin/Department'
import { Notifications } from '../components/admin/Notifications'
import { Verification } from '../components/admin/Verification'
import { Doctors } from '../components/admin/Doctors'
import Dashboard from '../components/admin/Dashboard'
import NotFound from '../components/common/admin/NotFound'
function AdminRoutes() {
  return (

    <Routes>

      <Route element={<AdminPublic />} >
        <Route exact path='/login' element={<Login />} />

      </Route>
      <Route element={<AdminProtected />} >

        <Route path="/" element={<Layout> </Layout>}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/verification/:id" element={<Verification />} />
          <Route path="/doctors" element={<Doctors />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>


  )
}

export default AdminRoutes
