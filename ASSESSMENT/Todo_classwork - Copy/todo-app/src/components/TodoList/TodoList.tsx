import { useTodos } from "../../hooks/useTodoContext";
import "./todolist.css";

const TodoList: React.FC = () => {
  const { todos, toggleTodo, filter, search } = useTodos();

  const filtered = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <ul className="todo-list">
      {filtered.map((todo) => (
        <li key={todo.id} style={{ marginBottom: 8 }}>
          <label
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              opacity: todo.completed ? 0.6 : 1,
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: 8 }}
            />
            {todo.text}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;