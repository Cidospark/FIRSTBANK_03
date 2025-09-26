import React from 'react';
import ThingsToDoItem from './ThingsToDoItem';
import type { Todo } from '../Model/Model';

interface ThingsTodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
}

const ThingsTodoList: React.FC<ThingsTodoListProps> = ({ todos, onToggleComplete }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <ThingsToDoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete} />
      ))}
    </ul>
  );
};

export default ThingsTodoList;