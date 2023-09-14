import { Outlet } from "react-router-dom"
import Home from '../pages/User/Home';
import Login from "../pages/User/Login";
function UserProtected() {
    if (localStorage.getItem('currentUser')) {
        return <Outlet/>
      }
      console.log('You have no account, Please Login');
      return <Login/>
}

export default UserProtected