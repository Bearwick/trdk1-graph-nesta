import './index.css'
import Home from "./pages/Home"
import NewChallenge from './pages/NewChallenge'
import Login from './pages/Login'
import MyChallenges from './pages/MyChallenges'
import Search from './pages/Search'
import ErrorPage from './pages/ErrorPage'
import UserProfile from './pages/UserProfile'
import RegisterUser from './pages/RegisterUser';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import ChallengeProvider from './globalState/ChallengeContext';
import React from 'react'


export default function App() {
  

  return (

    <ChallengeProvider>
    <BrowserRouter>
    <Routes>
        <Route path="Hjem" index element={<Home />} />
        <Route path="MinProfil" element={<Home />} />
        <Route path="LoggInn" element={<Login />} />
        <Route path="RegistrerBruker" element={<RegisterUser/>}></Route>
        <Route path="MineUtfordringer" element={<MyChallenges />} />
        <Route path="NyUtfordring" element={<NewChallenge />} />
        <Route path="Søk" element={<Search />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="BrukerProfil" element={<UserProfile />} />
    </Routes>
  </BrowserRouter>
  </ChallengeProvider>
  );
}
