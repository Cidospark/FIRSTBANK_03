import { Checkbox } from '../ui/checkbox';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTodoStore } from '@/store/todo-store';

export function Todos() {
	const { todos, removeTodo, markCompleted, markActive, markInactive } =
		useTodoStore();

	if (todos.length === 0) {
		return (
			<div className='mt-4 p-4'>
				<p className='text-gray-500'>No todos found.</p>
			</div>
		);
	}
	return (
		<div className='my-4 p-4 max-h-[400px] overflow-y-auto'>
			{todos.map(todo => (
				<div
					className='mb-2 p-2 border-gray-200 border-b'
					key={todo.id}>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-2'>
							<Checkbox
								checked={todo.status === 'completed'}
								onCheckedChange={() => markCompleted(todo.id)}
							/>
							<span>{todo.title}</span>
						</div>
						<div className='flex items-center gap-2'>
							<button
								className={cn(`hover:bg-gray-200 px-2 border border-gray-400`, {
									'bg-gray-200': todo.status === 'active',
									'bg-green-200': todo.status === 'completed',
									'bg-red-200': todo.status === 'inactive',
								})}
								onClick={() => {
									if (todo.status === 'active') {
										markInactive(todo.id);
									} else if (todo.status === 'inactive') {
										markActive(todo.id);
									}
								}}>
								{todo.status === 'active' && 'Active'}
								{todo.status === 'inactive' && 'Inactive'}
								{todo.status === 'completed' && 'Completed'}
							</button>
							<button
								className='flex justify-center items-center hover:bg-gray-200 p-2 border border-gray-400 rounded-full size-8 cursor-pointer'
								onClick={() => removeTodo(todo.id)}>
								<X />
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
