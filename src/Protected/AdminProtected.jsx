import { Outlet } from "react-router-dom"
import Home from '../pages/Admin/Home';
import Login from "../pages/Admin/Login";
import { Navigate } from "react-router-dom";
function AdminProtected (props) {
    if (localStorage.getItem('currentAdmin')) {
        return <Outlet/>
      }
      console.log('You have no account, Please Login');
      return <Navigate to="/admin/login"/>
}

export default AdminProtected 