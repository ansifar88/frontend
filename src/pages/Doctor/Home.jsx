import React from 'react'
import { NavBar } from '../../components/common/doctor/NavBar'
import { Footer } from '../../components/common/doctor/Footer'
function Home() {
  return (
    <>
 
      <div className='grid grid-rows-[5rem]'>
        <div>
          <NavBar/>
        </div>
        <div className='h-screen'>
          <h1 className='text-5xl '>DOCTOR DASHBOARD</h1>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default Home
