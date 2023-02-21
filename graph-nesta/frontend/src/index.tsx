import React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import App from './App';
import Test from './pages/Test'
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');
if (root == null) {
  throw new Error('Cannot render React app when root element is missing!');
}

createRoot(root).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="test" element={<Test />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
