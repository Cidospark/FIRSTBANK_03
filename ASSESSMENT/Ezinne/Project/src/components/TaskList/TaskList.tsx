import TaskItem from "../TaskItem/TaskItem";
import type { Task } from "../../model/Task.model";
import "./TaskList.css";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (index: number) => void;
  onDeleteTask: (index: number) => void;
}

export default function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-task">No tasks yet. Add one above!</p>
      ) : (
        tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onToggle={() => onToggleTask(index)}
            onDelete={() => onDeleteTask(index)}
          />
        ))
      )}
    </div>
  );
}

