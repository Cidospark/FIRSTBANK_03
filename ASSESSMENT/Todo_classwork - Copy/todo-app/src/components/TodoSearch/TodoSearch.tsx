import { useTodos } from "../../hooks/useTodoContext";
import "./todoSearch.css";

const TodoSearch: React.FC = () => {
  const { search, setSearch } = useTodos();
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default TodoSearch;