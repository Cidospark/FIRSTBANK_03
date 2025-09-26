import Filter from "./filter";
import "./styles.css"; // import CSS

export default function Control() {
  return (
    <div className="control">
      <button className="control-btn add">+</button>
      <button className="control-btn search">Search</button>
      <span className="divider">|</span>
      <span className="items-left">3 items left</span>
      <Filter />
    </div>
  );
}
