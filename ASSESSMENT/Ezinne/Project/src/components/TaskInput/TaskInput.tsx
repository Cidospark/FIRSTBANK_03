import { useState } from "react";
import "./TaskInput.css";

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    onAddTask(task);
    setTask("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
