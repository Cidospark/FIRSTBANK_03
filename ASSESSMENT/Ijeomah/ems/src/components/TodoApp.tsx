import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

import TodoFilters from "./TodoFilters";
import type { Todo } from "../types/todo.model";


const initialTodos: Todo[] = [
  { id: 1, title: "Learn Javascript", completed: false },
  { id: 2, title: "Learn React", completed: false },
  { id: 3, title: "Build a React App", completed: false },
];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTaskText, setNewTaskText] = useState("");

  const addTodo = () => {
    const title = newTaskText.trim();
    if (!title) return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setNewTaskText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>THINGS TO DO</h1>
      <TodoInput onChange={setNewTaskText} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} />
      <TodoFilters
        totalLeft={todos.filter(t => !t.completed).length}
        currentFilter={filter}
        setFilter={setFilter}
        onAdd={addTodo}
      />
    </div>
  );
}
