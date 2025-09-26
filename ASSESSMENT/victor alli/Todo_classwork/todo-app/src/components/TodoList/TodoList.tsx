import { useTodos } from "../../hooks/useTodoContext";
import './TodoList.css';
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
        <li className="todo-item" key={todo.id}>
          <input
            className="todo-checkbox"
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
          <label className="todo-label"></label>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;