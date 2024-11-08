import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';
import Home from './components/Home.jsx';
import NavBer from './components/Nav.jsx';


const App = () => {
  return (
    <div>
    <NavBer />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </div>
  )
}

export default App
