import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Sidebar from './Sidebar.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './SidebarContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex w-full h-screen">
          <Sidebar />
          <div className="flex-1 overflow-x-hidden overflow-y-auto">
            <App />
          </div>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
)
