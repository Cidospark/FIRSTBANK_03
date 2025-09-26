import { useTodos } from "../../hooks/useTodoContext";
import type { Filter } from "../../models/todoModel";
import "./todoFooter.css";

const TodoFooter: React.FC = () => {
  const { activeCount, filter, setFilter } = useTodos();

  return (
    <div className="todo-footer">
      <span>{activeCount} items left</span>
      <div className="filter-buttons">
        {(["all", "active", "completed"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontWeight: filter === f ? "bold" : "normal",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoFooter;