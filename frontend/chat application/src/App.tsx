import { useState } from 'react'
import Login from './pages/login/Login'
import './App.css'
import Signup from './pages/signup/Signup'
import Home from './pages/home/home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser} = useAuthContext();
  return (
    <>
      <div className='flex items-center justify-center flex-col h-screen bg-gradient-to-r from-cyan-100 to-blue-200'>
        <Routes>
          <Route path="/"  element={authUser ? <Home/> : <Navigate to="/login"/>}/>
          <Route path="/login"  element={authUser ? <Navigate to="/"/> : <Login/>}/>
          <Route path="/signup"  element={authUser ? <Navigate to="/"/> : <Signup/>}/>
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
