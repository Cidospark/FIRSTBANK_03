import type { TodoItemModel } from "./TodoItemModel.model";

export interface TodoContextVals{
    todos: TodoItemModel[],
    addTodo: (todo: TodoItemModel) => void,
    removeTodo: (id: number) => void,
    changeStatus : (id: number, statusType: string) => void, 
    markTaskCompleted:  (id: number) => void
}