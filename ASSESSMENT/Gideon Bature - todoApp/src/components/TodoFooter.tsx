function TodoFooter({
  itemsLeft,
  filter,
  onFilterChange,
  onClearCompleted,
}) {
  return (
    <div className="todo-footer">
      <span>{itemsLeft} items left</span>
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => onFilterChange("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </button>
      </div>
      <button className="clear-btn" onClick={onClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
};

export default TodoFooter;
