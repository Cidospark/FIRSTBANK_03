import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import UserProfile from './pages/Profile/UserProfile'
import NotFound from './components/NotFound/NotFound'

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile/:id' element={<UserProfile />} />
        <Route path='*' element={<NotFound />} />
     </Routes>
    </>
  )
}

export default App
