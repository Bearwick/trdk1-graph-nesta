import React from 'react';
import logo from './images/logo.svg';
import './App.css';
import Footer from "./components/Footer";
import Header from './components/Header';
import ChallengeCard from './components/ChallengeCard';


function App() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <h1 className='text-3xl font-bold underline'>
            Hello Group!
          </h1>
          <img src={logo} className="App-logo" alt="logo" />
          <ChallengeCard/>
        </header>
          <Footer />
      </div>
    );
  }
  
  export default App;
