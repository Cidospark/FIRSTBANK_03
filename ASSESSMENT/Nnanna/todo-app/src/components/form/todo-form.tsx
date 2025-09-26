import { todoSchema, type Todo } from '@/schemas/todo-schema';
import { useTodoStore, type TodoPayload } from '@/store/todo-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Todos } from '../todos';
import { SearchTodo } from '../todos/search-todo';
import { TodosCount } from '../todos/todos-count';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export function TodoForm() {
	const { addTodo } = useTodoStore();
	const formRef = useRef<HTMLFormElement | null>(null);

	const form = useForm<Todo>({
		resolver: zodResolver(todoSchema),
		mode: 'all',
	});

	const handleSubmit = (data: Todo) => {
		const id = crypto.randomUUID();
		const newTodo: TodoPayload = { ...data, id, status: 'active' };
		addTodo(newTodo);
		if (formRef.current) {
			formRef.current.reset();
		}
	};
	return (
		<div>
			<h2 className='mb-4 pt-4 font-medium text-2xl text-center'>
				THINGS TO DO
			</h2>
			<div className='mb-4 p-4'>
				<Form {...form}>
					<form ref={formRef}>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder='Add New'
											onChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Todos />
						<div className='flex items-center gap-2'>
							<button
								type='submit'
								className='bg-gray-200 px-2 border border-gray-400'
								onClick={form.handleSubmit(handleSubmit)}>
								<Plus />
							</button>
							<SearchTodo />
							<TodosCount />
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
