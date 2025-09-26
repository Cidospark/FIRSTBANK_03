import { useState, useEffect } from 'react';
import TodoForm from './Components/ThingsToDoForm';
import ThingsTodoList from './Components/ThingsToDoList';
import FilterButtons from './Components/FilterButtons';
import type { Todo } from './Model/Model';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsAddingNew(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setIsAddingNew(false);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const getFilteredTodos = (): Todo[] => {
    if (filter === 'Active') {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'Completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  };

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="App">
      <div className="container">
        <h1>THINGS TO DO</h1>
        {isAddingNew && <TodoForm onAddTodo={addTodo} />}
        <ThingsTodoList todos={getFilteredTodos()} onToggleComplete={toggleComplete} />
        <div className="bottom-bar">
          <div className="icon-group">
            <span className="icon" onClick={() => setIsAddingNew(true)}>+</span>
            <span className="icon">🔍</span>
            <span className="items-left">{activeTodosCount} items left</span>
          </div>
          <FilterButtons onFilterChange={setFilter} />
        </div>
        <div className="esc-message">Press 'Esc' to cancel.</div>
      </div>
    </div>
  );
}

export default App;