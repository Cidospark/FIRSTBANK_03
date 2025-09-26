import React from "react";
import { useTodo } from "../hooks/useTodo";
import TaskInput from "./taskInput";
import TaskItem from "./taskItem";
import "../styles/TodoApp.css";

const TodoApp: React.FC = () => {
  const {
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
  } = useTodo();

  return (
    <div className="todo-card">
      <h1 className="title">THINGS TO DO</h1>

      <TaskInput onAdd={addTask} />

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onActivate={activateTask}
            onDeactivate={deactivateTask}
            onDelete={deleteTask}
            isActiveFilter={filter === "active"}
          />
        ))}
      </ul>

      <div className="footer">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>{itemsLeft} items left</span>

        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("inactive")}>Inactive</button>
          
        </div>
        <footer>&copy; Faithjf's ToDo App</footer>
      </div>
    </div>
  );
};

export default TodoApp;
