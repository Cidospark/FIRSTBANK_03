import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import PortfolioList from './components/PortfolioList/PortfolioList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='dashboard-layout'>
      <nav>
        <div>
           side bar
        </div>
      </nav>
      <main>
        <PortfolioList />
      </main>
    </div>
  </StrictMode>,
)
