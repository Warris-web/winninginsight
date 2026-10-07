
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { rememberReferralCode } from './lib/referral'

// Capture ?ref= before the router mounts, then strip it from the address bar
rememberReferralCode()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)