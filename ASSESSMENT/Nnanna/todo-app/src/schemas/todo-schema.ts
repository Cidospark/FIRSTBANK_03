import { z } from 'zod';

export const todoSchema = z.object({
	title: z
		.string({ error: 'Title is required' })
		.min(5, 'Title must be at least 5 characters long'),
});

export type Todo = z.infer<typeof todoSchema>;
