import { createContext, useState, useEffect, type ReactNode } from "react";

type Task = {
  id: number;
  task: string;
  status: "Active" | "Completed";
};

type TasksContextType = {
  tasks: Task[];
  addTask: (task: string) => void;
  toggleTask: (id: number) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([{id:1, task:"hi", status:"Active"}]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: string) => {
    const newTask: Task = { id: Date.now(), task, status: "Active" };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "Active" ? "Completed" : "Active" } : t
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
}


