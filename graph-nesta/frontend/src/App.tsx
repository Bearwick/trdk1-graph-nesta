import React from 'react';
import logo from './images/logo.svg';
import './App.css';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-3xl font-bold underline'>
          Hello Group!
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <Footer />
    </div>
  );
}

export default App;
