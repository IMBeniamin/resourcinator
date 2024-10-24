import type { RequestHandler } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types';
import type { ResourceType } from '$lib/model/Resource';

export const GET: RequestHandler = async ({ platform }) => {
	const res: ResourceType = {
		title: 'SvelteKit',
		description: 'SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.',
		url: 'https://kit.svelte.dev',
		tags: ['svelte', 'kit']
	};
	// return new Response(JSON.stringify(res), {
	// 	headers: { 'Content-Type': 'application/json' },
	// });
	// Check if RESOURCES_KV are available
	if (!platform?.env?.RESOURCES_KV) {
		return new Response(
			JSON.stringify({ error: 'KV namespace not available' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}

	try {
		const kv: KVNamespace = platform.env.RESOURCES_KV;
		await kv.put('sveltekit', JSON.stringify(res));

		// List all keys in the KV namespace
		const { keys } = await kv.list();
		const resources: ResourceType[] = [];

		// Fetch each resource by its key
		for (const key of keys) {
			const resource = await kv.get<ResourceType>(key.name, 'json');
			if (resource) {
				resources.push(resource);
			}
		}

		return new Response(JSON.stringify(resources), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		console.error('Error fetching resources:', err);
		return new Response(
			JSON.stringify({ error: 'Failed to fetch resources' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
