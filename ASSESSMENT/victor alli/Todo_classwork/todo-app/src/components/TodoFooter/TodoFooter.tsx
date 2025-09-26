import { useTodos } from "../../hooks/useTodoContext";
import type { Filter } from "../../models/todoModel";
import './TodoFooter.css';
const TodoFooter: React.FC = () => {
  const { activeCount, filter, setFilter } = useTodos();

  return (
    <div className="todo-footer">
      <span className="todo-count">{activeCount} items left</span>
    </div>
  );
}

export default TodoFooter;