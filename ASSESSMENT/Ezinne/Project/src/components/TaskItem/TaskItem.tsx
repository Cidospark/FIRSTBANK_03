import "./TaskItem.css";
import type { Task } from "../../model/Task.model";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
      />
      <span className="task-text">{task.text}</span>
      <button className="status-btn" onClick={onToggle}>
        {task.completed ? "deactivate" : "activate"}
      </button>
      <button className="delete-btn" onClick={onDelete}>＋</button>
    </div>
  );
}

