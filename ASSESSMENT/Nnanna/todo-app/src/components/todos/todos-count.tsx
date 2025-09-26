import { useTodoStore } from '@/store/todo-store';

export function TodosCount() {
	const { todos } = useTodoStore();
	if (todos.length === 0) {
		return <p className='text-gray-500'>No todo.</p>;
	}
	return (
		<p className='text-gray-500'>
			{todos.length} {todos.length === 1 ? 'todo' : 'todos'}
		</p>
	);
}
