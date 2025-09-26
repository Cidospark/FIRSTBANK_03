import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TodoPayload = {
	id: string;
	title: string;
	status: 'active' | 'inactive' | 'completed';
};

export type TodoStore = {
	todos: TodoPayload[];
	filterTodosByTitle: (string: string) => void;
	addTodo: (todo: TodoPayload) => void;
	removeTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
	updateTodo: (id: string, title: string) => void;
	markActive: (id: string) => void;
	markCompleted: (id: string) => void;
	markInactive: (id: string) => void;
	filterTodos: (status: 'active' | 'inactive' | 'completed') => void;
};

export const useTodoStore = create<TodoStore>()(
	persist(
		(set, get) => ({
			todos: [],
			filterTodosByTitle: (title: string) =>
				set(state => ({
					todos: state.todos.filter(todo =>
						todo.title.toLowerCase().includes(title.toLowerCase())
					),
				})),
			addTodo: todo => set(state => ({ todos: [...state.todos, todo] })),
			removeTodo: id =>
				set(state => ({ todos: state.todos.filter(todo => todo.id !== id) })),
			toggleTodo: id =>
				set(state => ({
					todos: state.todos.map(todo =>
						todo.id === id
							? {
									...todo,
									status: todo.status === 'active' ? 'inactive' : 'active',
							  }
							: todo
					),
				})),
			updateTodo: (id, title) =>
				set(state => ({
					todos: state.todos.map(todo =>
						todo.id === id ? { ...todo, title } : todo
					),
				})),
			markActive: id =>
				set(state => ({
					todos: state.todos.map(todo =>
						todo.id === id ? { ...todo, status: 'active' } : todo
					),
				})),
			markCompleted: id => {
				const todo = get().todos.find(todo => todo.id === id);
				if (todo) {
					set(state => ({
						todos: state.todos.map(t =>
							t.id === id ? { ...t, status: 'completed' } : t
						),
					}));
				}
			},
			markInactive: id => {
				const todo = get().todos.find(todo => todo.id === id);
				if (todo) {
					set(state => ({
						todos: state.todos.map(t =>
							t.id === id ? { ...t, status: 'inactive' } : t
						),
					}));
				}
			},
			filterTodos: status => {
				const todos = get().todos;
				const filteredTodos = todos.filter(todo => todo.status === status);
				set({ todos: filteredTodos });
			},
		}),
		{
			name: 'todo-storage',
		}
	)
);
