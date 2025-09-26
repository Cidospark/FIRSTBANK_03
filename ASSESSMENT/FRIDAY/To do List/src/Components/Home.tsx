import Control from "./control.tsx";
import Inputbox from "./Inputbox.tsx";
import "./styles.css"; // import CSS
import TodoList from "./todoList.tsx";

export default function Home() {
  return (
    <div className="home">
      <h2 className="home-title">THINGS TO DO</h2>
      <Inputbox />
       <TodoList/> 
      <Control />
    </div>
  );
}
