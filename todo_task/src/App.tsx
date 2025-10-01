// import { useState } from 'react'
// import TodoItem from './components/TodoItem/TodoItem'
import TodoItemList from './components/TodoItemList/TodoItemList'
import type { TodoItemProps } from './models/TodoItemProps.model'
import "./App.css"
import FFButton from './components/FFButton/FFButton'
import { useEffect, useState, useMemo, useCallback } from 'react'


function App() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [formData, setFormData] = useState({newTask:""})
  const [todos, setTodos] = useState<TodoItemProps[]>([])

const changeStatus = useCallback((id: number, statusType: string) => {
  const todo = todos.find(t => t.id == id);
  if(todo)
    alert(todo.id)
}, []);

const removeItem = useCallback((id: number) => {
  setTodos(prevTodos => prevTodos.filter(i => i.id !== id));
}, []);

const list: TodoItemProps[] = useMemo(() => [
    {id:1, text:"Learn JavaScript", status: "activate", onUpdateChild:changeStatus, onRemoveChild:removeItem }, 
    {id:2, text:"Learn React", status: "completed", onUpdateChild:changeStatus, onRemoveChild:removeItem }, 
    {id:3, text:"Build a React App", status: "deactivate", onUpdateChild:changeStatus, onRemoveChild:removeItem },
], [changeStatus, removeItem]);

useEffect(()=>{
  setTodos([...list])
},[list])

/** functionalities starts here */

function toggleSearchBar(){
  setShowSearchBox(!showSearchBox);
}

function addNewTodo(text:string){
  setTodos([...todos, {id:Date.now(), text:text, status: "activate", onUpdateChild:changeStatus, onRemoveChild:removeItem}]);
}

function handleFormData(e){
  setFormData({...formData, [e.target.name]: e.target.value})
}
/** functionalities ends here */


  return (
    <div className='todo-container'>
      <div className='white-bg container'>
        <section className='header' style={{textAlign:"center"}}>
          <h1>THINGS TO DO</h1>
        </section>
        <section className='main'>
          <div>
            <input type='text' 
                  name='newTask' 
                  placeholder='Add New' 
                  className='input-control' 
                  onChange={handleFormData}
            />
          </div>
          <TodoItemList  list={todos} />
        </section>
      </div>
      <section className='footer light-green-bg'>
        <div className="footer-ls">
          <FFButton funcHandler={() => addNewTodo(formData.newTask)} text={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
          } />
          <FFButton funcHandler={toggleSearchBar} text={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>} />
            
            {showSearchBox && <div className='search-box'>
              <input type='text' name='search' placeholder='search...' className='input-control' />
            </div>}

            <div> | </div>
            <span>{todos.length} items left</span>
        </div>
        <div className="footer-rs">
          <FFButton text="All" />
          <FFButton text="Active" />
          <FFButton text="Completed" />
        </div>
      </section>
    </div>
  )
}

export default App
