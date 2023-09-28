import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom";

function DoctorPublic() {
    if (localStorage.getItem('currentDoctor')) {
        return <Navigate to="/doctor"/>
        }
        console.log("return case ");
        return <Outlet/>
}

export default DoctorPublic
