<script lang="ts">
	import Resource from '@/components/Resource.svelte';
	import type { ResourceDTO } from '$lib/model/Resource';

	let resource: ResourceDTO = {
		title: 'SvelteKit',
		description: 'SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.',
		url: 'https://kit.svelte.dev',
		tags: ['svelte', 'kit']
	}
</script>

<style>
    :global(body) {
        background-color: #121212;
        color: #e0e0e0;
        font-family: Arial, sans-serif;
    }
</style>

<div>
	<ul>
		<Resource resource="{resource}" />
	</ul>
</div>