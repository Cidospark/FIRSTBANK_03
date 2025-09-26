import type { Todo } from "../States/model/todo";

export const todoServices= {
    load(): Todo[] {
        try {
            const data = localStorage.getItem("todos");
            if(data) {
                return JSON.parse(data);
            }
        } catch (error) {
            console.error("Error loading todos:", error);
        }
    },

    save(todos: Todo[]): void {
        try {
            localStorage.setItem("todos", JSON.stringify(todos));
        } catch (error) {
            console.error("Error saving todos:", error);
        }
    }

    
}