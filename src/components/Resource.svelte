<script lang="ts">
	import type { ResourceDTO } from '$lib/model/Resource';
	export let resource: ResourceDTO;
	export let viewMode: 'icon' | 'detailed' = 'detailed';
</script>
<style>

</style>
<!--src="https://s2.googleusercontent.com/s2/favicons?domain_url={resource.url}"-->
{#if viewMode === 'detailed'}
	<div class="{$$restProps.class} resource p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-gray-100 dark:bg-gray-800">
		<div class="details">
			<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">{resource.title}</h2>
			<p class="text-sm text-gray-600 dark:text-gray-300">{resource.description}</p>
			<a href="{resource.url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 dark:text-blue-300 underline">
				{resource.url}
			</a>
			<div class="tags flex flex-wrap gap-2 mt-2">
				{#each resource.tags as tag}
					<span class="tag text-xs bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white px-2 py-1 rounded-full">{tag}</span>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<div class="{$$restProps.class} flex justify-center items-center rounded-[1.7rem] background-tint">
		<img
			src="https://cdn.brandfetch.io/{resource.url.replace(/(^\w+:|^)\/\//, '')}/logo"
			alt="{resource.title} icon"
			class="rounded-md object-cover" />
	</div>
{/if}
