import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useTodoStore } from '@/store/todo-store';

export function SearchTodo() {
	const [isOpen, setIsOpen] = useState(false);
	const { filterTodosByTitle } = useTodoStore();

	return (
		<div className='flex items-center'>
			{isOpen ? (
				<Input
					onBlur={() => setIsOpen(!isOpen)}
					className='mr-2'
					type='text'
					placeholder='Search...'
					onChange={e => filterTodosByTitle(e.target.value)}
				/>
			) : (
				<button className='hover:bg-gray-300 ml-2 p-2 rounded-md'>
					<Search onClick={() => setIsOpen(!isOpen)} />
				</button>
			)}
		</div>
	);
}
