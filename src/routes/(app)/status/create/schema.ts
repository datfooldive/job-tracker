import { z } from 'zod';

export const formSchema = z.object({
	name: z
		.string()
		.min(2, { error: 'Name must be at least 2 characters long' })
		.max(100, { error: 'Name must be at most 100 characters long' })
});

export type FormSchema = typeof formSchema;
