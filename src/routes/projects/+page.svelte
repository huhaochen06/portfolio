<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { onMount } from 'svelte';
	import ProjectPreview from '../(components)/project-preview.svelte';

	let msnry = $state<any>();
	let container = $state<Element>() as Element;

	onMount(async () => {
		const obj = await import('masonry-layout');
		msnry = new obj.default(container, {
			// options
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: 8,
			percentPosition: true
		});
	});
</script>

<div
	class="relative flex w-full items-start justify-center px-4 pb-28 pt-4 sm:items-center sm:px-8 sm:pb-28 sm:pt-8 md:px-20 md:pb-16 lg:items-start lg:py-[7.75rem] lg:pb-16 xl:px-0"
>
	<div bind:this={container} class="grid h-full w-full max-w-screen-xl">
		<div class="grid-sizer w-full sm:w-[calc(50%-8px)] md:w-[calc(33.3333%-8px)]"></div>

		{#each projects as project}
			<ProjectPreview
				{project}
				class="grid-item w-full sm:w-[calc(50%-8px)] md:w-[calc(33.3333%-8px)] "
			></ProjectPreview>
		{/each}
	</div>
</div>
