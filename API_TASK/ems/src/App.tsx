import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import UserProfile from './pages/Profile/UserProfile'

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<UserProfile />} />
     </Routes>
    </>
  )
}

export default App
