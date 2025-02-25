<script lang="ts">
	import { BlurEffect } from '$lib/components/blur-effect';
	import { images } from '$lib/data/gallery';
	import imagesLoaded from 'imagesloaded';
	import { onMount } from 'svelte';

	let msnry = $state<any>();
	let container = $state<Element>() as Element;

	onMount(async () => {
		const obj = await import('masonry-layout');
		msnry = new obj.default(container, {
			// options
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: 4,
			percentPosition: true
		});
		// Good to go!
	});

	$effect(() => {
		imagesLoaded(container).on('progress', function () {
			// layout Masonry after each image loads
			msnry?.layout();
		});
	});
</script>

<div bind:this={container} class="ml-1 grid">
	<div
		class="grid-sizer w-full sm:w-[calc(50%-4px)] md:w-[calc(33.3333%-4px)] lg:w-[calc(25%-4px)] xl:w-[calc(20%-4px)] 2xl:w-[calc(16.6667%-4px)]"
	></div>

	{#each images as image}
		<button
			class="grid-item group relative mt-1 w-full overflow-hidden sm:w-[calc(50%-4px)] md:w-[calc(33.3333%-4px)] lg:w-[calc(25%-4px)] xl:w-[calc(20%-4px)] 2xl:w-[calc(16.6667%-4px)]"
		>
			<BlurEffect
				direction="down"
				class="!bottom-0 !left-0 !right-0 !top-auto !w-full !translate-x-0 translate-y-20 opacity-0 transition-transform group-hover:translate-y-0 group-hover:opacity-100"
			/>
			<img
				src="https://cdn.haochen.dev/cdn-cgi/image/fit=contain,width=480/{image.name}"
				srcset="https://cdn.haochen.dev/cdn-cgi/image/fit=contain,width=960/{image.name} 2x,
                https://cdn.haochen.dev/cdn-cgi/image/fit=contain,width=1440/{image.name} 3x"
				alt={`${image.name}`}
				class="h-full w-full bg-muted object-cover"
				style="aspect-ratio: {image.width} / {image.height}"
			/>
		</button>
	{/each}
</div>

<style>
	/* clear fix */
	.grid:after {
		content: '';
		display: block;
		clear: both;
	}

	.grid-item {
		float: left;
	}

	.grid-item img {
		display: block;
		max-width: 100%;
	}
</style>
