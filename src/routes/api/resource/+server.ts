import type { RequestHandler } from '@sveltejs/kit';
import type { KVNamespace } from '@cloudflare/workers-types';
import type { ResourceDTO } from '$lib/model/Resource';

export const GET: RequestHandler = async ({ platform }) => {
	if (!platform?.env?.RESOURCES_KV) {
		return new Response(JSON.stringify({ error: 'KV namespace not available' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const kv: KVNamespace = platform.env.RESOURCES_KV;

		// List all keys in the KV namespace
		const { keys } = await kv.list();
		const resources: ResourceDTO[] = [];

		// Fetch each resource by its key
		for (const key of keys) {
			const resource = await kv.get<ResourceDTO>(key.name, 'json');
			if (resource) {
				resources.push(resource);
			}
		}

		return new Response(JSON.stringify(resources), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('Error fetching resources:', err);
		return new Response(JSON.stringify({ error: 'Failed to fetch resources' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

export const POST: RequestHandler = async ({ request, platform }) => {
	if (!platform?.env?.RESOURCES_KV) {
		return new Response(JSON.stringify({ error: 'KV namespace not available' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	try {
		const res: ResourceDTO = await request.json();
		const kv: KVNamespace = platform.env.RESOURCES_KV;
		await kv.put(res.title, JSON.stringify(res));

		return new Response(JSON.stringify(res), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
	catch (err) {
		if (err instanceof SyntaxError) {
			console.error('JSON Body formatted improperly:', err);
			return new Response(JSON.stringify({ error: 'JSON Body formatted improperly' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}
		console.error('Error saving resource:', err);
		return new Response(JSON.stringify({ error: 'Failed to save resource' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};