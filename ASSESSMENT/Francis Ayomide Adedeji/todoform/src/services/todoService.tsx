import type { Todo } from "../States/model/todo";

const LS_KEY = "todos";

function load(): Todo[] {
  try {
    const data = localStorage.getItem(LS_KEY);
    if (data) return JSON.parse(data) as Todo[];
  } catch (error) {
    console.error("Error loading todos:", error);
  }
  return [];
}

function save(todos: Todo[]): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos:", error);
  }
}

let nextId = Date.now();
function create(text: string): Todo {
  return { id: ++nextId, text, completed: false };
}

export const todoService = { load, save, create };

export default todoService;
