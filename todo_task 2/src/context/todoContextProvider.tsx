import { useState, type ReactNode } from "react";
import type { TodoContextVals } from "../models/TodoContextVals";
import {TodoContext} from "../hook/TodoContext"
import type { TodoItemModel } from "../models/TodoItemModel.model";

export const TodoContextProvider = ({children}:{children:ReactNode}) => {
    const initialList: TodoItemModel[] = [
                            {id:1, text:"Learn JavaScript", status: "start" }, 
                            {id:2, text:"Learn React", status: "completed"}, 
                            {id:3, text:"Build a React App", status: "stop" },
                        ];
    const [todoList, setTodoList] = useState<TodoItemModel[]>(initialList);
                        
    function addTodo(todo:TodoItemModel ){
        setTodoList([...todoList, todo]) // add to array using spread
    }

    function removeTodo(id: number ){
        const filtered = todoList.filter(t => t.id != id);
        setTodoList([...filtered]) // assign array to array using spread
    }

    function markTaskCompleted(id:number){
        const updated = todoList.map(t => t.id==id? {...t, status:"completed"}: t) // update an object using spread
        setTodoList([...updated]);
    }


    function changeStatus(id:number, statusType:string){
        const updated = todoList.map(t => {
            if(t.id == id){
                if(t.status.toLocaleLowerCase() != "completed")
                    return {...t, status:statusType.toLocaleLowerCase() == 'start'? 'stop' : 'start'}
                else
                    return t
            }else{
                return t
            }
        })

        setTodoList(updated)
    }


    const values: TodoContextVals = { 
        todos:todoList,
        addTodo,
        removeTodo,
        changeStatus,
        markTaskCompleted
    }
    return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>
}