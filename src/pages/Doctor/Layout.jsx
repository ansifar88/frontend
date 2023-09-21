import React from 'react'
import { NavBar } from '../../components/common/doctor/NavBar'
import { Footer } from '../../components/common/doctor/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <>
 
      <div className='grid grid-rows-[5rem]'>
        <div>
          <NavBar/>
        </div>
        <div className='h-auto min-h-screen'>
          <Outlet/>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default Layout
