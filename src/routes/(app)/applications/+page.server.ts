import { db } from '$lib/server/db';
import { application, applicationtag } from '$lib/server/db/schema';
import { eq, inArray } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const applications = await db.query.application.findMany({
		with: {
			status: true,
			applicationTags: {
				with: {
					tag: true
				}
			}
		}
	});
	return {
		applications
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (!id) return fail(400, { success: false, message: 'Invalid ID' });

		const applicationId = Number(id);
		if (isNaN(applicationId)) {
			return fail(400, { success: false, message: 'Invalid ID format' });
		}

		await db.transaction(async (tx) => {
			await tx.delete(applicationtag).where(eq(applicationtag.applicationId, applicationId));
			await tx.delete(application).where(eq(application.id, applicationId));
		});

		return { success: true, message: 'Application deleted successfully' };
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
			await tx.delete(applicationtag).where(inArray(applicationtag.applicationId, ids));
			await tx.delete(application).where(inArray(application.id, ids));
		});

		return {
			success: true,
			message: `${ids.length} application${ids.length > 1 ? 's' : ''} deleted successfully`
		};
	}
};
