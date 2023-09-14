import { Outlet } from "react-router-dom"
import Home from '../pages/Doctor/Home';
import Login from "../pages/Doctor/Login";
function DoctorProtected() {
    if (localStorage.getItem('currentDoctor')) {
        return <Outlet/>
      }
      console.log('You have no account, Please Login');
      return <Login/>
}

export default DoctorProtected