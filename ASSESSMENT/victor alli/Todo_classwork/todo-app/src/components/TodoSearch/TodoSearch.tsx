import { useTodos } from "../../hooks/useTodoContext";
import './TodoSearch.css';
const TodoSearch: React.FC = () => {
  const { search, setSearch } = useTodos();
  return (
    <div className="todo-search">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default TodoSearch;