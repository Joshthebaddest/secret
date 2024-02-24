import { useState } from 'react'
import './App.css'
import { Logo, Footer } from './component'
import { Home, Secret, NotFound } from './pages'

import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Logo />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/secret/:id' element={<Secret/>}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
