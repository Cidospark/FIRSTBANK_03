import { TodoForm } from './components/form/todo-form';

function App() {
	return (
		<div className='flex justify-center items-center bg-gray-100 mx-auto min-h-screen'>
			<div className='bg-white shadow rounded-[8px] w-full max-w-2xl'>
				<TodoForm />
			</div>
		</div>
	);
}

export default App;
