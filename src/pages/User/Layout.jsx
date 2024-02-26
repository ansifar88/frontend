import { NavBar } from "../../components/common/user/NavBar"
import { Footer } from "../../components/common/user/Footer"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function Layout() {
  return (
    <>
      <div className='grid grid-rows-[5rem]'>
        <ToastContainer/>
        <div>
          <NavBar />
        </div>
        <div className='h-auto min-h-screen  bg-blue-50'>
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout