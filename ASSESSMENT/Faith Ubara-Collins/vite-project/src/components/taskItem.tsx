import React from "react";
import type { Task } from "../types/tasks";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onActivate: (id: number) => void;
  onDeactivate: (id: number) => void;
  onDelete: (id: number) => void;
  isActiveFilter: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onActivate,
  onDeactivate,
  onDelete,
  isActiveFilter,
}) => {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          fontWeight: isActiveFilter && !task.completed ? "bold" : "normal",
        }}
      >
        {task.completed ? "✅ " : ""}{task.text}
      </span>
      <button onClick={() => onActivate(task.id)}>Activate</button>
      <button onClick={() => onDeactivate(task.id)}>Deactivate</button>
      <button onClick={() => onDelete(task.id)} style={{ color: "red" }}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
