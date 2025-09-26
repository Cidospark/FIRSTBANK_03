import React, { useState, useEffect } from 'react';
import './App.css';

type input = { id: number; text: string; completed: boolean }
const App: React.FC = () => {
  const [tasks, setTasks] = useState<input[]>(() =>{
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return savedTasks
  });
  
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  // useEffect(() => {
  //   const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  //   setTasks(savedTasks);
  // }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (inputValue.trim() === '') return;
    const newTask = { id: Date.now(), text: inputValue, completed: false };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeactivate = (id: number) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: false } : task
    ));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      (filter === 'Active' && !task.completed) ||
      (filter === 'Completed' && task.completed) ||
      filter === 'All';

    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const itemsLeft = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">THINGS TO DO</h1>

        <div className="new-task">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add New"
            className="input"
          />

          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="checkbox"
              />
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </span>

              {!task.completed && (
                <button onClick={() => handleToggleTask(task.id)} className="btn activate">
                  activate
                </button>
              )}
              {task.completed && (
                <button onClick={() => handleDeactivate(task.id)} className="btn deactivate">
                  deactivate
                </button>
              )}

              <button onClick={handleAddTask} className="icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 
                    10 10 10 10-4.48 10-10S17.52 2 
                    12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        
        <div className="bottom-section">
          <div className="controls">
            <button onClick={handleAddTask} className="add-btn">
              +
            </button>
             <button onClick={() => setShowSearch(!showSearch)} className="icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 
                  6.471 0 0 0 16 9.5 6.5 6.5 0 
                  1 0 9.5 16c1.61 0 3.09-.59 
                  4.23-1.57l.27.28v.79l5 4.99L20.49 
                  19l-4.99-5zm-6 0C7.01 14 5 
                  11.99 5 9.5S7.01 5 9.5 5 14 
                  7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>

            {showSearch && (
              <>
                <span className="divider">|</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search... (${itemsLeft} items left)`}
                  className="search-input"
                />
              </>
            )}
          </div>

          <div className="filters">
            <button
              onClick={() => setFilter('All')}
              className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('Active')}
              className={`filter-btn ${filter === 'Active' ? 'active' : ''}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('Completed')}
              className={`filter-btn ${filter === 'Completed' ? 'active' : ''}`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
