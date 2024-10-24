<script lang="ts">
	import type { ResourceDTO } from '$lib/model/Resource';

	export let resource: ResourceDTO;
</script>

<div class="resource">
<!--	<img src="{resource.icon}" alt="{resource.title} icon" class="icon" />-->
	<div class="details">
		<h2>{resource.title}</h2>
		<p>{resource.description}</p>
		<a href="{resource.url}" target="_blank" rel="noopener noreferrer">
			{resource.url}
		</a>
		<div class="tags">
			{#each resource.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.resource {
		display: flex;
		align-items: flex-start;
		margin-bottom: 1em;
	}
	/*.icon {*/
	/*	width: 48px;*/
	/*	height: 48px;*/
	/*	margin-right: 1em;*/
	/*}*/
	.details {
		flex: 1;
	}
	.tags {
		margin-top: 0.5em;
	}
	.tag {
		display: inline-block;
		background-color: #333;
		padding: 0.2em 0.5em;
		margin-right: 0.3em;
		border-radius: 3px;
		font-size: 0.9em;
	}
</style>
