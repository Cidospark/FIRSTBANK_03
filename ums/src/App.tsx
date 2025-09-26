// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { getUsers } from './services/api'
import { useState, useRef, useEffect } from 'react';


function Loading() {
  return <h1>Loading…</h1>;
}

function PageLoaded() {
  return <h1>My Page</h1>;
}


function App(props) {

  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    // count.current = count.current + 1;
    setCount(count + 1)
  },[inputValue]);

  const handleLoadUsers = async ()=>{
    //getUsers().then(users => console.log(users));
    const res = await getUsers();
    console.log(res)
  }

  return (
    <>
    {props.data ? <PageLoaded /> : !props.data && <Loading />}
      <div>
        <button onClick={handleLoadUsers}>
          Load Users
        </button>
        <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count}</h1>
      </div>
    </>
  )
}

export default App
