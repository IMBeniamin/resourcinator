import type { RequestHandler } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types';
import Resource from '../../../components/Resource.svelte';

export const GET: RequestHandler = async ({ platform }) => {
	// Check if platform and RESOURCES_KV are available
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

		// List all keys in the KV namespace
		const { keys } = await kv.list();
		const resources: Resource[] = [];

		// Fetch each resource by its key
		for (const key of keys) {
			const resource = await kv.get<Resource>(key.name, 'json');
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
