import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Sidebar from './Sidebar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='flex md:flex w-full'>
      <Sidebar/>
      <App />
    </div>
  </StrictMode>,
)