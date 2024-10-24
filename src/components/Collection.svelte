<script>
	import { onMount } from 'svelte';
	import Resource from './Resource.svelte';

	let resources = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/resources');
			resources = await response.json();
		} catch (error) {
			console.error('Error fetching resources:', error);
		}
	});
</script>

{#if resources.length > 0}
  <div class="resources-list">
    {#each resources as resource}
      <Resource {resource} />
    {/each}
  </div>
{:else}
  <p>Loading resources...</p>
{/if}

<style>
    .resources-list {
        display: flex;
        flex-direction: column;
    }
</style>
