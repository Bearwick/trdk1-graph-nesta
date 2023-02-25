import '../App.css'
import React from 'react'
import Header from '../components/Header';

function NewChallenge() {
  return (
    <div className="App">
        <Header />
        <header className="App-header">
            <h1 className="text-3xl font-bold underline">Opprett en ny utfordring!</h1>
        </header>
    </div>
  )
}

export default NewChallenge;