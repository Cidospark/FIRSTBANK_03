import type { TodoItemProps } from "../../models/TodoItemProps.model";
import "./TodoItem.css"
function TodoItem({ text, status, id, onUpdateChild, onRemoveChild }: TodoItemProps) {
    
    const strikeText = status === 'completed' ? 'strikeThroughText' : '';
    const boldText = status === 'activate' ? 'bold-text' : '';
    const activationBtnCondition = status == 'activate' ? 'deactivate' : 
                                   status == 'deactivate' ? 'activate' : 'completed' ;

    function handleFunc(){
        onUpdateChild(id, status)
    }

    function handleRemove(){
        onRemoveChild(id)
    }

    return <div key={id} className="todo-row">
        <div className="todo-item-ls">
            <input type="checkbox" name="isCompleted" />
            <span className={`${strikeText} ${boldText}`.trim()} >{text}</span>
        </div>
        <div className="todo-item-rs">
            <button onClick={handleFunc} className="normal-btn-style bordered W100">{activationBtnCondition}</button>
            <button onClick={handleRemove} className="normal-btn-style rounded-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e00"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
        </div>

    </div>
}
export default TodoItem;