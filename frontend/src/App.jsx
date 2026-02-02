import React from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'

const App = () => {
  
  return (

    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
    </Routes>

  )
}

export default App