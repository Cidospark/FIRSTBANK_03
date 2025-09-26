import { useState } from "react";
import "./home.css";
import TaskInput from "../../components/TaskInput/TaskInput";
import TaskList from "../../components/TaskList/TaskList";

export interface Task {
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTask = (task: string) => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const itemsLeft = tasks.filter((task) => !task.completed).length;

  return (
    <div className="home-container">
      <h1 className="title">Things To Do</h1>
      <TaskInput onAddTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />

      {/* Footer Section */}
      <div className="footer">
        <div className="icons">
          <span className="plus">＋</span>
          <span className="search">🔍</span>
          <span className="count">{itemsLeft} items left</span>
        </div>
        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}

