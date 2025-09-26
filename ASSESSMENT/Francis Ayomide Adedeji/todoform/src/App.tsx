// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import AddTodo from './components/addtodo'

// function App() {
//   return<>
 
//   <h1>THINGS TO DO</h1>
//   <AddTodo onAdd={AddTodo} placeholder="Add New" />
//   </>  
// }

// export default App


import { useEffect, useReducer, useState } from "react";
import type { Todo } from "./States/model/todo";
import { todoService } from "./services/todoService";
import AddTodo from "./components/addtodo";
import TodoList from "./components/TodoList";
import Footer from "./components/footer";
import "./App.css";
type Filter = "all" | "active" | "completed";

type State = { todos: Todo[] };
type Action =
  | { type: "load"; payload: Todo[] }
  | { type: "add"; payload: Todo }
  | { type: "delete"; payload: { id: number } }
  | { type: "toggle"; payload: { id: number } }
  | { type: "updateText"; payload: { id: number; text: string } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "load":
      return { todos: action.payload };
    case "add":
      return { todos: [action.payload, ...state.todos] };
    case "delete":
      return { todos: state.todos.filter((t) => t.id !== action.payload.id) };
    case "toggle":
      return {
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, completed: !t.completed } : t
        ),
      };
    case "updateText":
      return {
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, text: action.payload.text } : t
        ),
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { todos: [] });
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  // initial load
  useEffect(() => {
    const loaded = todoService.load();
    if (loaded.length) {
      dispatch({ type: "load", payload: loaded });
    } else {
      // seed example items
      const seed = [
        todoService.create("Learn Javascript"),
        todoService.create("Learn React"),
        todoService.create("Build a React App"),
      ];
      dispatch({ type: "load", payload: seed });
    }
  }, []);

  // persist whenever todos change
  useEffect(() => {
    todoService.save(state.todos);
  }, [state.todos]);

  // actions
  const add = (text: string) => {
    if (!text.trim()) return;
    const item = todoService.create(text);
    dispatch({ type: "add", payload: item });
  };

  const remove = (id: number) => dispatch({ type: "delete", payload: { id } });
  const toggle = (id: number) => dispatch({ type: "toggle", payload: { id } });
  const updateText = (id: number, text: string) =>
    dispatch({ type: "updateText", payload: { id, text } });

  const itemsLeft = state.todos.filter((t) => !t.completed).length;

  const filtered = state.todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  }).filter(t => t.text.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="page">

      <main className="card">
      <header className="header">
        <h1>THINGS TO DO</h1>
      </header>
        <AddTodo onAdd={add} placeholder="Add New" />

        <TodoList
          todos={filtered}
          onToggle={toggle}
          onDelete={remove}
          onUpdateText={updateText}
        />

        <Footer
          itemsLeft={itemsLeft}
          filter={filter}
          setFilter={setFilter}
          query={query}
          setQuery={setQuery}
          total={state.todos.length}
        />
      </main>

      <p className="hint">Press Esc to cancel.</p>
    </div>
  );
}