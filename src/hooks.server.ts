import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const pathname = event.url.pathname;

	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (pathname === '/login' && session) {
		throw redirect(303, '/');
	}

	if (pathname !== '/login' && !pathname.startsWith('/api/auth') && !session) {
		throw redirect(303, '/login');
	}

	return svelteKitHandler({ event, resolve, auth, building });
}
