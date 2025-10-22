import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	const { pathname } = event.url;
	const isAuthPath = pathname === '/login' || pathname.startsWith('/api/auth');

	if (session && pathname === '/login') throw redirect(303, '/');
	if (!session && !isAuthPath) throw redirect(303, '/login');

	return svelteKitHandler({ event, resolve, auth, building });
}
