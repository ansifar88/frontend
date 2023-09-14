import { Outlet } from "react-router-dom"
import Home from '../pages/Doctor/Home';

function DoctorPublic() {
    if (localStorage.getItem('currentDoctor')) {
        console.log("public route");
          return <Home/>
        }
        console.log("return case ");
        return <Outlet/>
}

export default DoctorPublic
