import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';

if (!env.GITHUB_CLIENT_ID) throw new Error('GITHUB_CLIENT_ID is not set');
if (!env.GITHUB_CLIENT_SECRET) throw new Error('GITHUB_CLIENT_SECRET is not set');

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'mysql'
	}),
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
