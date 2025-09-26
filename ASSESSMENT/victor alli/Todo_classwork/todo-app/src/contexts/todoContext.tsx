import React, { createContext, useState } from "react";
import type { Filter, Todo, TodoContextType } from "../models/todoModel";


export const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([
    
  ]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        search,
        setSearch,
        filter,
        setFilter,
        activeCount,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;