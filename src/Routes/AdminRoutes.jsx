import { Routes , Route } from 'react-router-dom'
import Login from '../pages/Admin/Login'
import Home from '../pages/Admin/Home'
import AdminPublic from '../Protected/AdminPublic'
import AdminProtected from '../Protected/AdminProtected'
import Layout from '../pages/Admin/Layout'
import { Users } from '../components/admin/Users'
function AdminRoutes() {
  return (
    
      <Routes>

        <Route element={ <AdminPublic/>} >
          <Route exact path='/login' element={ <Login/> } />
          
        </Route>
        <Route element={ <AdminProtected/>} >

        <Route  path="/" element={ <Layout> </Layout> }>
          <Route index element={  <Home/> } />
          <Route path="/users" element={ <Users/> } />
        </Route>
        </Route>
        
      </Routes>

   
  )
}

export default AdminRoutes
