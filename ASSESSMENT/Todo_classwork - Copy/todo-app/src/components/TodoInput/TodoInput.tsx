import { useState } from "react";
import { useTodos } from "../../hooks/useTodoContext";
import "./todoinput.css";

const TodoInput: React.FC = () => {
  const { addTodo } = useTodos();
  const [text, setText] = useState("");

  const handleAdd = () => {
    addTodo(text);
    setText("");
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Add New"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        
      />
      <button onClick={handleAdd}>+</button>
    </div>
  );
};

export default TodoInput;