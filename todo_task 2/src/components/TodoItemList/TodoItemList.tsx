import type { TodoItemListModel } from "../../models/TodoItemModel.model";
import TodoItem from "../TodoItem/TodoItem";


function TodoItemList({ list }: Readonly<TodoItemListModel>) {
    
    return <div className='todo-items'>
          {
            list.map(item => <TodoItem key={item.id} id={item.id} text={item.text} status={item.status} />)
          }
        </div>
}

export default TodoItemList;