import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import PopupFundHero from './pages/claude/PopupFundHero.jsx'
import Hero from './pages/hero/Hero.jsx'
// import Header from './components/header/Header.jsx'

createRoot(document.getElementById('root')).render(
  <>   
   {/* <App /> */}
      {/* <Header/> */}
       <PopupFundHero/>
  </>,
)
