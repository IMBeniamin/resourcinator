<script lang="ts">
	// import Resource from '../components/Resource.svelte';
	let resources: { name: string }[] = [];

	async function loadResources() {
		const res = await fetch('/api/resources');
		resources = await res.json();
	}

	loadResources();
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
		{#each resources as resource}
			<li>{resource.name}</li>
		{/each}
	</ul>
</div>