import { createContext, useContext } from "react";
import type { TodoContextVals } from "../models/TodoContextVals";

export const TodoContext = createContext<TodoContextVals | undefined>(undefined);

export const UseTodoContext = () =>{
    const context = useContext(TodoContext);
    if(!context){
        throw new Error("Todo context must be used inside todo provider.")
    }
    return context;
};

