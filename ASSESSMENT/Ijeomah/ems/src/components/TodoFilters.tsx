interface Props {
  totalLeft: number;
  currentFilter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  onAdd: () => void;
}

export default function TodoFilters({ totalLeft, currentFilter, setFilter, onAdd }: Props) {
  return (
    <div className="todo-footer">
      <button className="add-button" onClick={onAdd}>＋</button>
      <span className="items-left">{totalLeft} items left</span>
      <div className="filters">
        <button onClick={() => setFilter("all")} className={currentFilter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("active")} className={currentFilter === "active" ? "active" : ""}>Active</button>
        <button onClick={() => setFilter("completed")} className={currentFilter === "completed" ? "active" : ""}>Completed</button>
      </div>
    </div>
  );
}
