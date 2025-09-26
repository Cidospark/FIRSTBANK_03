function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      </label>
      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        ✕
      </button>
    </li>
  );
};

export default TodoItem;
