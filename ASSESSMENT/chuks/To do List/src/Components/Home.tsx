import Control from "./control.tsx";
import Inputbox from "./Inputbox.tsx";
import "./styles.css"; // import CSS
import TodoList from "./todoList.tsx";
import { useTasks } from "../Context/UseTasksContext.tsx";

export default function Home() {
  const {tasks} = useTasks(); // this is how to get you items in the app
  console.log(tasks);
  return (
    <div className="home">
      <h2 className="home-title">THINGS TO DO</h2>
      <Inputbox />
       <TodoList/> 
      <Control />
    </div>
  );
}
