import React, { useState } from 'react';
import './TodoApp.css';

type Todo = {
  id: number;
  text: string;
  active: boolean;
  completed: boolean;
};

type Filter = 'all' | 'active' | 'inactive' | 'completed';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn Javascript', active: true, completed: false },
    { id: 2, text: 'Learn React', active: false, completed: false },
    { id: 3, text: 'Build a React App', active: false, completed: false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addTodo = () => {
    if (newTask.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: newTask.trim(),
      active: false,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setNewTask('');
  };

  const toggleActivation = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, active: !todo.active } : todo
      )
    );
  };pleted = (id: number) => {
    setTodos((prev) =>
      prev.map((

  const toggleComtodo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return todo.active && !todo.completed;
    if (filter === 'inactive') return !todo.active && !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }).filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h2>THINGS TO DO</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add New"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            <span
              style={{
                fontWeight: todo.active ? 'bold' : 'normal',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <button
              className={todo.active ? 'deactivate' : 'activate'}
              onClick={() => toggleActivation(todo.id)}
            >
              {todo.active ? 'Deactivate' : 'Activate'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>

      <div className="footer">
        <button className="icon-btn" onClick={addTodo}>+</button>
        
        {/* Search Icon Button */}
        <button
          className="icon-btn"
          onClick={() => setSearchMode((prev) => !prev)}
        >
          🔍
        </button>

        {/* Show search input when search mode is active */}
        {searchMode && (
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        )}

        <span>{todos.length} items left</span>
        <div className="filters">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('inactive')}>Inactive</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
      </div>

      <div className="hint-text">
        Press <code>Esc</code> to cancel.
      </div>
    </div>
  );
};

export default TodoApp;

