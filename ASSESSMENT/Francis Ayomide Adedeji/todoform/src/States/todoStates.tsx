import { useState } from "react";
import type { Todo } from "./model/todo";

export default function useTodo(initial: Todo[] = []) {
    const [todos, setTodos] = useState<Todo[]>(initial);

    const addTodo = (item: Todo) => setTodos((t) => [item, ...t]);
    const updateTodo = (id: number, patch: Partial<Todo>) =>
        setTodos((t) => t.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    const removeTodo = (id: number) => setTodos((t) => t.filter((x) => x.id !== id));

    return { todos, addTodo, updateTodo, removeTodo };
}