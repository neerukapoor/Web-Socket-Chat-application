import { useState } from 'react'
import Login from './pages/login/Login'
import './App.css'
import Signup from './pages/signup/Signup'
import Home from './pages/home/home'

function App() {
  return (
    <>
      <div className='flex items-center justify-center flex-col h-screen bg-gradient-to-r from-cyan-100 to-blue-200'>
        {/* <Login/> */}
        {/* <Signup/> */}
        <Home/>
      </div>
    </>
  )
}

export default App
