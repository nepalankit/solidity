import React from 'react'
import PickWinner from './PickWinner'

import Home from './Home'
import "./App.css"
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'


function App() {
  return (

    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/pickWinner'>PickWinner</Link>
            </li>
          </ul>
        </nav>
        <Routes >
          <Route path='/pickWinner' element={<PickWinner />} />
          <Route path='/' element={<Home />} />

        </Routes>
      </div>

    </BrowserRouter>
  )
}


export default App;