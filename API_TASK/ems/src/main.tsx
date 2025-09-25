import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.tsx'
import { UserContextProvider } from './contexts/userContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
      <NavBar />
      <App />
    </BrowserRouter>
    </UserContextProvider>
  </StrictMode>,
)
