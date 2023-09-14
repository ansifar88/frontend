import React, { useState } from 'react'
import { NavBar } from '../../components/common/user/NavBar'
import Banner from '../../components/user/Banner';
import { Footer } from '../../components/common/user/Footer';
function Home() {
  return (
    <>
      <div className='h-screen grid grid-rows-[5rem]'>
        <div>
            <NavBar/> 
        </div>
        <div>
            <Banner/>
        </div>
        <div>
        <Footer/>
        </div>
      </div>
    </>
    
  )
}

export default Home
