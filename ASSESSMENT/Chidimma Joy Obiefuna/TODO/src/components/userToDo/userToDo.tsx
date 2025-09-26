import { useState } from 'react'

export function ToDo() {

    const [todos, setTodos] = useState([
        {id: 1, text: "Learn Javascript", completed: false},
        {id: 2, text: "Learn React", completed: false,},
        {id: 3, text: "Build a React App", completed: false}]
      );
    
      const [input, setInput] = useState ("");
    
       const addTodo = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
        setInput("");
      };
    
      const toggleTodo = (id: number) => {
        setTodos(
          todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        );
      };

     return ( 
  <>
    <div className="ToDoPage">
      <h1>THINGS TO DO</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add New"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

      <ul className="checkBoxList">
        {todos.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo(t.id)}
              />
              <span style={{ textDecoration: t.completed ? "line-through" : "" }}>
                {t.text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="buttonList">
        <button type='submit' onClick={setInput}>+</button>
        <button>All</button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        </button>
      </div>

      <p className="escapeToCancel">Press `Esc` to cancel.</p>
    </div>
  </>
     )
}