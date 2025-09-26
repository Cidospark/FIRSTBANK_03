import { useState } from "react";

type Task = {
  id: number;
  task: string;
  status: "Active" | "Completed";
};

export default function CollectData() {
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

    setTasks((prev) => [...prev, newTask]); // push into array
    setInput(""); // clear input
  };

  return (
    
  );
}
