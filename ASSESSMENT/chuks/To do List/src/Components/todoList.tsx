import "./styles.css";

export default function TodoList() {
  return (
    <div className="todo-list">
      <div className="todo-item">
        <input type="checkbox" id="task1" />
        <label htmlFor="task1">Learn Javascript</label>
      </div>

      <div className="todo-item">
        <input type="checkbox" id="task1" />
        <label htmlFor="task1">Learn React</label>
      </div>

      <div className="todo-item">
        <input type="checkbox" id="task1" />
        <label htmlFor="task1">Build React App</label>
      </div>
    </div>
  );
}
