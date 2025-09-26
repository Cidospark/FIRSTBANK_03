import type { Todo } from "../States/model/todo";
import TodoItem from "./ToDoItem";

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateText: (id: number, text: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onUpdateText }: Props) {
  if (todos.length === 0) return <div className="empty">No items</div>;

  return (
    <ul className="todo-list">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
          onSave={(text) => onUpdateText(t.id, text)}
        />
      ))}
    </ul>
  );
}
