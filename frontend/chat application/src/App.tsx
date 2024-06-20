import { useState } from 'react'
import Login from './pages/login/Login'
import './App.css'
import Signup from './pages/signup/Signup'
import Home from './pages/home/home'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <div className='flex items-center justify-center flex-col h-screen bg-gradient-to-r from-cyan-100 to-blue-200'>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path="/signup"  element={<Signup/>}/>
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
