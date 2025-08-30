import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, HashRouter } from "react-router-dom"
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <HashRouter>
      <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </StrictMode>,
)
