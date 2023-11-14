import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom";

function AdminPublic() {
    if (localStorage.getItem('currentAdmin')) {
        console.log("public route");
        return <Navigate to="/admin" />
    }
    console.log("return case ");
    return <Outlet />
}
export default AdminPublic
