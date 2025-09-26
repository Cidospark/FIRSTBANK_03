import { useState } from "react";
import type { Task } from "../types/tasks";

export const useTodo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "inactive">("all");

  const addTask = (text: string) => {
    if (text.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      inactive: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const activateTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, inactive: false } : task
      )
    );
  };

  const deactivateTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, inactive: true } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
  // search filter first
  if (search && !task.text.toLowerCase().includes(search.toLowerCase())) {
    return false;
  }

  if (filter === "all") return true;
  if (filter === "active") return !task.completed && !task.inactive;
  if (filter === "completed") return task.completed && !task.inactive;
  if (filter === "inactive") return task.inactive;
  
  return true;
});

//   const filteredTasks = tasks.filter((task) => {
//     if (search && !task.text.toLowerCase().includes(search.toLowerCase())) {
//       return false;
//     }
//     if (filter === "active") return !task.completed && !task.inactive;
//     if (filter === "completed") return task.completed;
//     if (filter === "inactive") return task.inactive;
//     return true;
//   });

  const itemsLeft = tasks.filter((task) => !task.completed && !task.inactive).length;

  return {
    tasks,
    filteredTasks,
    search,
    setSearch,
    filter,
    setFilter,
    addTask,
    toggleTask,
    activateTask,
    deactivateTask,
    deleteTask,
    itemsLeft,
  };
};
