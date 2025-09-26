// src/Components/ThingsToDoFooter.tsx
import React, { useState } from 'react';
import FilterButtons from './FilterButtons';
import type { Todo } from '../Model/Model';

interface TodoFooterProps {
  todos: Todo[];
  onFilterChange: (filter: 'All' | 'Active' | 'Completed') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ThingsToDoFooter: React.FC<TodoFooterProps> = ({
  todos,
  onFilterChange,
  searchQuery,
  setSearchQuery,
}) => {
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <div className="bottom-bar">
      <div className="bottom-left">
        <div className="items-left">{activeTodosCount} items left</div>
        <div className="icons">
          {/* The + icon is a placeholder here */}
          <span className="icon plus-icon">+</span>
          {/* The search icon toggles the search input */}
          <span className="icon search-icon" onClick={() => setIsSearchVisible(!isSearchVisible)}>
            🔍
          </span>
        </div>
      </div>
      {/* Search input conditionally rendered */}
      {isSearchVisible && (
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}
      <FilterButtons onFilterChange={onFilterChange} />
    </div>
  );
};

export default ThingsToDoFooter;