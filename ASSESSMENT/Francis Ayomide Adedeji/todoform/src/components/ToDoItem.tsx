import { useEffect, useRef, useState } from "react";
import type { Todo } from "../States/model/todo";

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onSave: (text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      const len = inputRef.current?.value.length ?? 0;
      inputRef.current?.setSelectionRange(len, len);
    } else {
      setDraft(todo.text);
    }
  }, [editing, todo.text]);

  const save = () => {
    const text = draft.trim();
    if (!text) {
      onDelete();
      return;
    }
    if (text !== todo.text) onSave(text);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          aria-label={`Toggle ${todo.text}`}
        />
      </label>

      {!editing ? (
        <div className="todo-content" onDoubleClick={() => setEditing(true)}>
          <span className="todo-text">{todo.text}</span>
        </div>
      ) : (
        <div className="todo-edit">
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancel();
            }}
            onBlur={save}
            aria-label="Edit todo"
          />
        </div>
      )}

      <div className="todo-actions">
        <button className="btn small" onClick={() => setEditing(true)} title="Edit">
          ✎
        </button>
        <button className="btn small danger" onClick={onDelete} title="Delete">
          ✕
        </button>
      </div>
    </li>
  );
}
