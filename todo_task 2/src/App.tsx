// import { useState } from 'react'
// import TodoItem from './components/TodoItem/TodoItem'
import TodoItemList from './components/TodoItemList/TodoItemList'
import "./App.css"
import FFButton from './components/FFButton/FFButton'
import { useEffect, useState } from 'react'
import { list } from './services/todoServices'
import type { TodoItemProps } from './models/TodoItemProps.model'

function App() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [itemsLeft, setItemsLeft] = useState(0)
  const [formData, setFormData] = useState({newTask:""})
  const [formErrData, setFormErrorData] = useState({newTask:""})
  const [searchData, setSearchData] = useState({term:""})
  const [list2, setList] = useState<TodoItemProps[]>(list)
  
  useEffect(() => {
    
  }, [])

  useEffect(() => {
    setList(list2)
    //setItemsLeft((list2.filter(l => l.status.toLocaleUpperCase() != "completed")).length)
    const itemsLeft = list2.filter(l => l.status.toLocaleUpperCase() == "completed");
    console.log(itemsLeft)
  }, [list2])

  function toggleSearchBar(){
    setShowSearchBox(!showSearchBox);
  }

  /** functionalities starts here */
  function handleOnChangeForAddData(e){
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleAddTodo(){
    // AddTodo({id:Date.now(), text:formData.newTask, status:"activate"});
    // if(formData.newTask === "") return;
    const err : {newTask:string} = validateFormData()
    if(err.newTask == ""){
      setList([...list2, {id:Date.now(), text:formData.newTask, status:"activate"}])
    }else{
      setFormErrorData(err);
    }
  }

  function handleOnChangeForSearchData(e){
    setSearchData({...searchData, [e.target.name]: e.target.value})
  }

  function search(){
    const filtered = list2.filter(l => l.text.toLocaleLowerCase().includes(searchData.term));
    if(searchData.term.length <= 0) {setList(list) }else{ setList(filtered);}
  }
  /** functionalities ends here */


  function validateFormData(): {newTask:string}{
    const errors: {newTask:string} = {newTask:""};
    if(formData.newTask.length < 2 || formData.newTask.length > 20)
    {
      errors.newTask = "Characters length must be between 2 and 20."
    }
    if(!formData.newTask)
    {
      errors.newTask = "Todo cannot be empty!"
    }
    return errors
  }

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
                  onChange={handleOnChangeForAddData}
            />
            <p style={{color:"red"}}>{formErrData.newTask}</p>
          </div>
          <TodoItemList  list={list2} />
        </section>
      </div>
      <section className='footer light-green-bg'>
        <div className="footer-ls">
          <FFButton funcHandler={() => handleAddTodo()} text={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
          } />
          <FFButton funcHandler={toggleSearchBar} functionHandleSearch={handleOnChangeForSearchData} text={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>} />
            
            {showSearchBox && <div className='search-box'>
              <div className='search-box-cover'>
                <svg onClick={search} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                <input type='text' name='term' placeholder='search...' className='input-control'  onChange={handleOnChangeForSearchData} />
                </div>
            </div>}

            <div> | </div>
            <span>{itemsLeft} items left</span>
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
