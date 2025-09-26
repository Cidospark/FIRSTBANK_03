
import type { Todo } from "../types/todo.model";
import TodoItem from "./TodoItems";


export default function TodoList({
  todos,
  onToggle,
}: {
  todos: Todo[];
  onToggle: (id: number) => void;
}) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
}
