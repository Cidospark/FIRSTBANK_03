// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import TodoCard from './components/TodoCard/TodoCard'
import TodoFooter from './components/TodoFooter/TodoFooter'
import TodoInput from './components/TodoInput/TodoInput'
import TodoList from './components/TodoList/TodoList'
import TodoSearch from './components/TodoSearch/TodoSearch'
import TodoProvider from './contexts/todoContext'
//import Home from './pages/HomePage/Home'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="body">
      <div className="App">
        <h1 className="heading">THINGS TO DO</h1>
        <TodoInput />
        <TodoSearch />
        <TodoList />
        <TodoFooter />
      </div>
    </div>
  );
}

export default App
