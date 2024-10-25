<script lang="ts">
	import type { ResourceDTO } from '$lib/model/Resource';
	import Resource from '@/components/Resource.svelte';

	export let children: ResourceDTO[];
</script>

<div class="collection
flex flex-wrap
mx-2
w-52
h-52
gap-2
p-{children.length === 1 ? 0 : 2}
rounded-3xl
bg-slate-100 dark:bg-slate-800">
	{#if children.length === 1}
		<div class="flex">
			<Resource resource={children[0]} viewMode="icon" class="flex-auto w-full aspect-square p-3" />
		</div>

	{:else if children.length === 2}
		<div class="flex-auto flex-col">
			<div class="flex flex-row basis-1/2">
				{#each children as child}
					<Resource resource={child} viewMode="icon" class="flex-auto w-1/2 aspect-square m-1" />
				{/each}
			</div>
			<div/>
		</div>

	{:else if children.length >= 3 && children.length <= 4}
		<div class="flex flex-wrap">
			{#each children as child}
				<Resource resource={child} viewMode="icon" class="w-[calc(50%-0.5rem)] m-1 aspect-square" />
			{/each}
		</div>

	{:else}
		<div class="flex flex-wrap">
			{#each children.slice(0, 3) as child}
				<Resource resource={child} viewMode="icon" class="w-[calc(50%-0.5rem)] m-1 aspect-square" />
			{/each}
			<div class="w-[calc(50%-0.5rem)]
			aspect-square
			flex flex-wrap items-start
			p-1 m-1
			rounded-[1.7rem]
			background-tint">
				{#each children.slice(3, 7) as child}
					<Resource resource={child} viewMode="icon" class="w-[calc(50%-0.5rem)] m-1 aspect-square" />
				{/each}
			</div>
		</div>
	{/if}
</div>
