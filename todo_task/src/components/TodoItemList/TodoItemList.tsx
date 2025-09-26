import type { TodoItemListProps } from "../../models/TodoItemProps.model";
import TodoItem from "../TodoItem/TodoItem";


function TodoItemList({ list }: Readonly<TodoItemListProps>) {
    
    return <div className='todo-items'>
          {
            list.map(item => <TodoItem key={item.id} id={item.id} text={item.text} status={item.status} onUpdateChild={item.onUpdateChild} onRemoveChild={item.onRemoveChild} />)
          }
        </div>
}

export default TodoItemList;