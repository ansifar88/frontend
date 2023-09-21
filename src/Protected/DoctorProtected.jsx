import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom";
function DoctorProtected() {
    if (localStorage.getItem('currentDoctor')) {
        return <Outlet/>
      }
      console.log('You have no account, Please Login');
      return <Navigate to="/doctor/login"/>
}

export default DoctorProtected