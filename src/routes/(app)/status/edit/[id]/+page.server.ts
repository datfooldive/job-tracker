import { superValidate } from 'sveltekit-superforms';
import { fail, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { formSchema } from './schema';
import { zod4 } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { status } from '$lib/server/db/schema';
import { setError } from 'sveltekit-superforms';
import { eq, and, not } from 'drizzle-orm';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id, 10);
	if (isNaN(id)) {
		throw error(404, 'Not found');
	}

	const statusData = await db.query.status.findFirst({
		where: eq(status.id, id)
	});

	if (!statusData) {
		throw error(404, 'Not found');
	}

	const form = await superValidate(statusData, zod4(formSchema));
	return {
		form,
		id
	};
};

export const actions: Actions = {
	default: async ({ request, cookies, params }) => {
		const id = parseInt(params.id, 10);
		if (isNaN(id)) {
			throw error(404, 'Not found');
		}

		const form = await superValidate(request, zod4(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const existingStatus = await db.query.status.findFirst({
			where: and(eq(status.name, form.data.name), not(eq(status.id, id)))
		});

		if (existingStatus) {
			return setError(form, 'name', 'Name already exists');
		}

		await db
			.update(status)
			.set({
				name: form.data.name
			})
			.where(eq(status.id, id));

		throw redirect(
			303,
			'/status',
			{ type: 'success', message: 'Status updated successfully!' },
			cookies
		);
	}
};
