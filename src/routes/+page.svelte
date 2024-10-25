<script lang="ts">
	import type { ResourceDTO } from '$lib/model/Resource';
	import Collection from '@/components/Collection.svelte';
	import { DarkMode, Navbar, NavBrand, NavHamburger, NavUl } from 'flowbite-svelte';
	import { data } from '$lib/data';

	const blockSizes = [8, 3, 2, 1, 1];
	let index = 0;
	const blocks = blockSizes.map(size => {
		const block = data.slice(index, index + size);
		index += size;
		return block;
	});
	let resources_blocks: ResourceDTO[][] = blocks;

</script>

<div class="page h-screen flex flex-col dark:bg-slate-900">
	<Navbar>
		<NavBrand href="/">
			<img src="icon.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Resourcinator</span>
		</NavBrand>
		<NavHamburger  />
		<NavUl >
			<DarkMode />
		</NavUl>
	</Navbar>
	<div class="container mx-auto flex flex-row">
		{#each resources_blocks as resources_block}
			<Collection children={resources_block} />
		{/each}
	</div>
</div>