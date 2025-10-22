import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { formSchema } from './schema';
import { zod4 } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { status } from '$lib/server/db/schema';
import { setError } from 'sveltekit-superforms';
import { eq } from 'drizzle-orm';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(formSchema));
	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const existingStatus = await db.query.status.findFirst({
			where: eq(status.name, form.data.name)
		});

		if (existingStatus) {
			return setError(form, 'name', 'Name already exists');
		}

		await db.insert(status).values({
			name: form.data.name
		});

		throw redirect(
			303,
			'/status',
			{ type: 'success', message: 'Status created successfully!' },
			cookies
		);
	}
};
