import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from '../Pages/Home.jsx'
import {BrowserRouter} from 'react-router-dom';
// import Carousal from '../Pages/Carousal.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <Home/>
  </StrictMode>
  </BrowserRouter>
)
