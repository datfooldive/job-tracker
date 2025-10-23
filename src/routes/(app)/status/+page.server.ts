import { db } from '$lib/server/db';
import { application, status } from '$lib/server/db/schema';
import { eq, inArray, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const status = await db.query.status.findMany({
		extras: {
			applicationCount:
				sql<number>`(select count(*) from application where application.status_id = status.id)`.as(
					'application_count'
				)
		}
	});
	return {
		status
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id) return fail(400, { success: false, message: 'Invalid ID' });

		const statusId = Number(id);
		if (isNaN(statusId)) {
			return fail(400, { success: false, message: 'Invalid ID format' });
		}

		const appCount = await db
			.select({
				count: sql<number>`count(*)`
			})
			.from(application)
			.where(eq(application.statusId, statusId));

		if (appCount[0].count > 0) {
			return fail(400, { success: false, message: 'Cannot delete status that is in use.' });
		}

		await db.transaction(async (tx) => {
			await tx.delete(status).where(eq(status.id, statusId));
		});

		return { success: true, message: 'Status deleted successfully' };
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

		const appCount = await db
			.select({
				count: sql<number>`count(*)`
			})
			.from(application)
			.where(inArray(application.statusId, ids));

		if (appCount[0].count > 0) {
			return fail(400, { success: false, message: 'Cannot delete statuses that are in use.' });
		}

		await db.transaction(async (tx) => {
			await tx.delete(status).where(inArray(status.id, ids));
		});

		return {
			success: true,
			message: `${ids.length} status${ids.length > 1 ? 'es' : ''} deleted successfully`
		};
	}
};
