import { Outlet } from "react-router-dom"
import Home from '../pages/User/Home';

function UserPublic() {
    if (localStorage.getItem('currentUser')) {
        console.log("public route");
          return <Home/>
        }
        
        console.log("return case ");
        return <Outlet/>
}

export default UserPublic
