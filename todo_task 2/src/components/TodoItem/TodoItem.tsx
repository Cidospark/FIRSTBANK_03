import { UseTodoContext } from "../../hook/TodoContext";
import type { TodoItemModel } from "../../models/TodoItemModel.model";
import "./TodoItem.css"
function TodoItem({ text, status, id}: TodoItemModel) {

    const {removeTodo, changeStatus, markTaskCompleted} = UseTodoContext();
    
    const strikeText = status === 'completed' ? 'strikeThroughText' : '';
    const boldText = status === 'start' ? 'bold-text' : '';
    // const activationStatus = status == 'activate' ? 'deactivate' : 
    //                                status == 'deactivate' ? 'activate' : 'completed' ;

    // functionalities
    function handleDelete(id:number){
        removeTodo(id);
    }

    function handleChangeStatus(id:number, activationStatus:string){
        changeStatus(id, activationStatus)
    }

    function handleMarkAsComplete(id:number){
        markTaskCompleted(id)
    }

    return <div key={id} className="todo-row">
        <div className="todo-item-ls">
            <input type="checkbox" name="isCompleted" checked={status.toLowerCase() == "completed"}
            onChange={() => handleMarkAsComplete(id)} />
            <span className={`${strikeText} ${boldText}`.trim()} >{text}</span>
        </div>
        <div className="todo-item-rs">
            <button 
                onClick={() => handleChangeStatus(id, status)} 
                className="normal-btn-style bordered W100 uppercase-text"
                >{status == 'completed' ? 'completed': status == 'stop'? 'start': 'stop'}</button>
            <button onClick={() => handleDelete(id)} className="normal-btn-style rounded-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e00"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
        </div>

    </div>
}
export default TodoItem;