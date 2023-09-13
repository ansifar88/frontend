import React, { useState } from 'react'
import { NavBar } from '../../components/common/user/NavBar'
import Banner from '../../components/user/Banner';
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
        <Banner/>
        </div>
      </div>
    </>
    
  )
}

export default Home
