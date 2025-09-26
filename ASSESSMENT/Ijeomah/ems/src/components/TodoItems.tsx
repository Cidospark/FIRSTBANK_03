import type { Todo } from "../types/todo.model";


export default function TodoItem({
  todo,
  onToggle,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
}) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.title}</span>
    </li>
  );
}
