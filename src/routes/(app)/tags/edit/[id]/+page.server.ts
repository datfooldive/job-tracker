import { superValidate } from 'sveltekit-superforms';
import { fail, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { formSchema } from './schema';
import { zod4 } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { tag } from '$lib/server/db/schema';
import { setError } from 'sveltekit-superforms';
import { eq, and, not } from 'drizzle-orm';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id, 10);
	if (isNaN(id)) {
		throw error(404, 'Not found');
	}

	const tagData = await db.query.tag.findFirst({
		where: eq(tag.id, id)
	});

	if (!tagData) {
		throw error(404, 'Not found');
	}

	const form = await superValidate(tagData, zod4(formSchema));
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

		const existingtag = await db.query.tag.findFirst({
			where: and(eq(tag.name, form.data.name), not(eq(tag.id, id)))
		});

		if (existingtag) {
			return setError(form, 'name', 'Name already exists');
		}

		await db
			.update(tag)
			.set({
				name: form.data.name
			})
			.where(eq(tag.id, id));

		throw redirect(
			303,
			'/tags',
			{ type: 'success', message: 'Tag updated successfully!' },
			cookies
		);
	}
};
