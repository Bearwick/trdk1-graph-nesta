import logo from '../images/logo.svg'
import '../App.css'
import React from 'react'

function Test() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">Hello Test!</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  )
}

export default Test
