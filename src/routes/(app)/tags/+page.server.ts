import { db } from '$lib/server/db';
import { tag } from '$lib/server/db/schema';
import { eq, inArray } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const tags = await db.query.tag.findMany();
	return {
		tags
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as number | null;
		if (!id) return fail(400, { success: false, message: 'Invalid ID' });
		try {
			await db.delete(tag).where(eq(tag.id, id));
			return { success: true, message: 'Status deleted successfully' };
		} catch (e) {
			return fail(500, { success: false, message: 'Something went wrong' });
		}
	},
	deleteMulti: async ({ request }) => {
		const data = await request.formData();
		const ids = (data.get('ids') as string)?.split(',').map(Number);
		if (!ids || ids.length === 0) {
			return fail(400, { success: false, message: 'Invalid IDs' });
		}
		try {
			await db.delete(tag).where(inArray(tag.id, ids));
			return { success: true, message: `${ids.length} statuses deleted successfully` };
		} catch (e) {
			return fail(500, { success: false, message: 'Something went wrong' });
		}
	}
};
