import { useState } from "react";
import { useTodos } from "../../hooks/useTodoContext";
import './TodoInput.css';
const TodoInput: React.FC = () => {
  const { addTodo } = useTodos();
  const [text, setText] = useState("");

  const handleAdd = () => {
    addTodo(text);
    setText("");
  };

  return (
    <div className="todo-input-container">
      <input
        type="text"
        placeholder="Add New"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="todo-input"
      />
      <button onClick={handleAdd} className="add-btn">+</button>
    </div>
  );
};

export default TodoInput;