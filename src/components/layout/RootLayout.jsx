import React from 'react'
import {Outlet} from 'react-router-dom'
import BackgoundImageSlider from '../common/BackgoundImageSlider'
import NavBar from './Navbar'

const RootLayout = () => {
  return (
    <main>
      <NavBar/>
        <BackgoundImageSlider/>
      <div>
        <Outlet/>
      </div>
    </main>
  )
}

export default RootLayout
