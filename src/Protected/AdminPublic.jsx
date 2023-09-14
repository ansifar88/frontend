import { Outlet } from "react-router-dom"
import Home from '../pages/Admin/Home';

function AdminPublic() {
    if (localStorage.getItem('currentAdmin')) {
        console.log("public route");
          return <Home/>
        }
        
        console.log("return case ");
        return <Outlet/>
}

export default AdminPublic
