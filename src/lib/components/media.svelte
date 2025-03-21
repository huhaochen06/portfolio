<script lang="ts">
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';

	const { src, alt, caption, video = false } = $props();

	let enlarged = $state(false);
</script>

<figure>
	<button
		class="relative overflow-hidden rounded-lg border border-neutral-300 *:m-0 dark:border-neutral-800"
		onclick={() => (enlarged = !enlarged)}
	>
		{#if video}
			<video {src} autoplay loop muted playsinline></video>
		{:else}
			<img {src} {alt} />

			<!-- Darkened background overlay -->
			{#if enlarged}
				<div
					role="button"
					tabindex="0"
					aria-label="Close image"
					aria-hidden="true"
					class="fixed inset-0 z-50 bg-black/70"
					transition:fade={{ duration: 100 }}
					onclick={(e) => {
						e.stopPropagation();
						enlarged = false;
					}}
				></div>
			{/if}

			<img
				class={cn(
					'absolute inset-0 z-10 opacity-0 transition-opacity duration-100',
					enlarged &&
						'fixed left-1/2 top-1/2 z-[60] h-auto max-h-[80vh] w-auto max-w-[90vw] -translate-x-1/2 -translate-y-1/2 object-contain opacity-100'
				)}
				{src}
				{alt}
			/>
		{/if}
	</button>
	<figcaption class="text-center">{caption}</figcaption>
</figure>
