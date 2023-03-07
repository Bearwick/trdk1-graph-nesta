import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App';
import NewChallenge from './pages/NewChallenge'
import Login from './pages/Login'
import MyChallenges from './pages/MyChallenges'
import Search from './pages/Search'
import ErrorPage from './pages/ErrorPage'
import UserProfile from './pages/UserProfile'
import reportWebVitals from './reportWebVitals'
import RegisterUser from './pages/RegisterUser';

const root = document.getElementById('root')
if (root == null) {
  throw new Error('Cannot render React app when root element is missing!')
}

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="Hjem" index element={<App />} />
          <Route path="MinProfil" element={<App />} />
          <Route path="LoggInn" element={<Login />} />
          <Route path="RegistrerBruker" element={<RegisterUser/>}></Route>
          <Route path="MineUtfordringer" element={<MyChallenges />} />
          <Route path="NyUtfordring" element={<NewChallenge />} />
          <Route path="Søk" element={<Search />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<App />} />
          <Route path="BrukerProfil" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
