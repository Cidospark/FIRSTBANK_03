// src/components/FilterButtons.tsx
import React from 'react';

interface FilterButtonsProps {
  onFilterChange: (filter: 'All' | 'Active' | 'Completed') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange }) => {
  return (
    <div className="filters">
      <button onClick={() => onFilterChange('All')}>All</button>
      <button onClick={() => onFilterChange('Active')}>Active</button>
      <button onClick={() => onFilterChange('Completed')}>Completed</button>
    </div>
  );
};

export default FilterButtons;