import { useEffect, useState } from 'react'
// import TodoItem from './components/TodoItem/TodoItem'
import TodoItemList from './components/TodoItemList/TodoItemList'
import "./App.css"
import FFButton from './components/FFButton/FFButton'
import { UseTodoContext } from './hook/TodoContext'
import type { TodoItemModel } from './models/TodoItemModel.model'


function App() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [list, setList] = useState<TodoItemModel[]>([]);
  const [formData, setFormData] = useState({newTask:""})
  const [errMsg, setErrMsg] = useState({text:""})
  const {todos, addTodo} = UseTodoContext();
  const [activeBtn, setActiveBtnText] = useState('all');

  useEffect(() =>{
    setList(todos)
  },[todos])

/** functionalities starts here */

  function toggleSearchBar(){
    setShowSearchBox(!showSearchBox);
  }

  function handleChangeOnFormData(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleAddTodo(){
    if(isValidText(formData.newTask, "New todo")){
      addTodo({ id:Date.now(), status: "start", text: formData.newTask });
      setErrMsg({text:""})
    }

  }

  function handleClearTextBox(){
     setErrMsg({text:""})
  }

  function isValidText(str: string, ops: string):boolean{
    let result:boolean = false;
    
    if(str == ""){
      setErrMsg({text:"Invalid entry!"})
    }else if(str.length < 2 || str.length > 20){
      setErrMsg({text:ops + " must be between 1 - 20 characters long!"})
    }else{
      result = true;
    }

    return result;
  }

  function handleFetchAllTodos(){
    setList(todos);
    setActiveBtnText('all')
  }

  function handleActiveTodos(){
    setList(todos.filter(t => t.status.toLowerCase() == 'start'))
    setActiveBtnText('active')
  }

  function handleCompletedTodos(){
    setList(todos.filter(t => t.status.toLowerCase() == 'completed'))
    setActiveBtnText('completed')
  }

  function handleChangeOnSearchBar(e: React.ChangeEvent<HTMLInputElement>){
    const filtered = todos.filter(t => t.text.toLowerCase().includes(e.target.value.toLowerCase()))
    setList(filtered)
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
                  onChange={handleChangeOnFormData}
                  onClick={handleClearTextBox}
            />
            <p style={{color:"red"}}>{errMsg.text}</p>
          </div>
          {list.length > 0 && <TodoItemList  list={list} />} 
          {list.length < 1 && <div style={{color:"red", paddingBottom:"15px"}}>No todo found!</div>} 
        </section>
      </div>
      <section className='footer light-green-bg'>
        <div className="footer-ls">
          <FFButton funcHandler={handleAddTodo} text={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
          } />
          <FFButton funcHandler={toggleSearchBar} text={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>} />
            
            {showSearchBox && <div className='search-box'>
              <input  
                      type='text' 
                      name='search' 
                      placeholder='search...' 
                      className='input-control' 
                      onChange={handleChangeOnSearchBar}
                      onClick={handleClearTextBox}
              />
            </div>}

            <div> | </div>
            <span>{list.length} items left</span>
        </div>
        <div className="footer-rs">
          <FFButton funcHandler={handleFetchAllTodos} text="All" activeBtn={activeBtn == 'all'? 'active-btn':''} />
          <FFButton funcHandler={handleActiveTodos}  text="Active" activeBtn={activeBtn == 'active'? 'active-btn':''} />
          <FFButton funcHandler={handleCompletedTodos}  text="Completed" activeBtn={activeBtn == 'completed'? 'active-btn':''} />
        </div>
      </section>
    </div>
  )
}

export default App
