import { env } from '$env/dynamic/private';

export async function handle({ event, resolve }) {
	if (event.request.method !== 'GET'
		&& !event.request.headers.has('X-Auth-Token')
		&& event.request.headers.get('X-Auth-Token') !== env.API_TOKEN) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	return await resolve(event);
	}