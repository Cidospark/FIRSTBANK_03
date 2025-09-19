// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { getUsers } from './services/api'

function App() {

  const handleLoadUsers = ()=>{
    getUsers();
  }

  return (
    <>
      <div>
        <button onClick={handleLoadUsers}>
          Load Users
        </button>
      </div>
    </>
  )
}

export default App
