import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom";

function UserPublic() {
    if (localStorage.getItem('currentUser')) {
        return <Navigate to="/"/>
        }
        
        console.log("return case ");
        return <Outlet/>
}

export default UserPublic
