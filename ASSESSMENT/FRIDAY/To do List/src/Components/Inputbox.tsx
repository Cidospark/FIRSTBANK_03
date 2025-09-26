import "./styles.css"; 
import { useState } from "react";

type Task = { 
  id: number; 
  task: string; 
  status: "Active" | "Completed"; 
};

export default function Inputbox() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      task: input,
      status: "Active",
    };

    setTasks((prev) => [...prev, newTask]);
    setInput(""); // clear input after adding
  };

  return (
    <div>
      <form className="searchbox" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Add New" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}  
        />
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.task} — <i>{t.status}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}
