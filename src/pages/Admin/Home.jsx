import React from 'react'
import { NavBar } from '../../components/common/admin/NavBar'
import { Sidebar } from '../../components/common/admin/Sidebar'
import { Footer } from '../../components/common/admin/Footer'
function Home() {
  return (
    <>
      {/* <div className='h-screen grid grid-rows-[5rem] '>
        <div>
            <NavBar/> 
        </div>
        <div className='invisible md:visible'>
            <Sidebar/>
        </div>
        <div>
       <Footer/>
        </div>
      </div> */}
      <div className='h-screen grid grid-rows-[5rem] '>
        <div> <NavBar/> </div>
        <div className='md:grid md:grid-cols-[18.7rem,1fr]'>
        <div className='invisible md:visible'><Sidebar/></div>
          <div>
            <div className='h-full bg-blue-gray-400 '>
              <h1 className='text-3xl'>DOCTOR DASHBOARD WILL APPEAR HERE</h1>
            </div>
            <div><Footer/></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
