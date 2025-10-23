import { db } from '$lib/server/db';
import { tag } from '$lib/server/db/schema';
import { eq, inArray, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const tags = await db.query.tag.findMany({
		extras: {
			applicationCount:
				sql<number>`(select count(*) from application_tag where application_tag.tag_id = tag.id)`.as(
					'application_count'
				)
		}
	});
	return {
		tags
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id) return fail(400, { success: false, message: 'Invalid ID' });

		const tagId = Number(id);
		if (isNaN(tagId)) {
			return fail(400, { success: false, message: 'Invalid ID format' });
		}

		await db.transaction(async (tx) => {
			await tx.delete(tag).where(eq(tag.id, tagId));
		});

		return { success: true, message: 'Tag deleted successfully' };
	},

	deleteMulti: async ({ request }) => {
		const data = await request.formData();
		const idsString = data.get('ids');

		if (!idsString || typeof idsString !== 'string') {
			return fail(400, { success: false, message: 'Invalid IDs' });
		}

		const ids = idsString
			.split(',')
			.map(Number)
			.filter((id) => !isNaN(id));

		if (ids.length === 0) {
			return fail(400, { success: false, message: 'No valid IDs provided' });
		}

		await db.transaction(async (tx) => {
			await tx.delete(tag).where(inArray(tag.id, ids));
		});

		return {
			success: true,
			message: `${ids.length} tag${ids.length > 1 ? 's' : ''} deleted successfully`
		};
	}
};
