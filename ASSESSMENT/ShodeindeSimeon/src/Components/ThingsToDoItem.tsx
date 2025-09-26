import React from 'react';
import type { Todo } from '../Model/Model';
import './ThingsToDoItems.css';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
        />
        <span className="checkmark"></span>
      </label>
      <span className="todo-text">{todo.text}</span>
      
      <div className="item-actions" onClick={() => onToggleComplete(todo.id)}>
        {todo.completed ? (
          <span className="action-text deactivate">deactivate</span>
        ) : (
          <span className="action-text activate">activate</span>
        )}
        <span className="action-icon">+</span>
      </div>
    </li>
  );
};

export default TodoItem;