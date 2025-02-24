<script>
	// @ts-nocheck

	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { data } from './data';

	let { starCount = 100 } = $props();
	let count = starCount <= 1024 ? starCount : 1024;

	// Create three layers of stars
	const layers = [
		{ speed: 0.1, size: [0, 0.5], stars: [] }, // Smallest, most distant stars
		{ speed: 0.2, size: [0.5, 1], stars: [] }, // Small, distant stars
		{ speed: 0.3, size: [1, 1.5], stars: [] }, // Medium stars
		{ speed: 0.4, size: [1.5, 2.0], stars: [] }, // Large, close stars
		{ speed: 0.5, size: [2.0, 4], stars: [] } // Largest, closest stars
	];

	// Distribute stars across layers based on their size
	for (let i = 0; i < count; i++) {
		const star = data[i];
		if (star.size <= 1) {
			layers[0].stars.push(star);
		} else if (star.size <= 1.5) {
			layers[1].stars.push(star);
		} else {
			layers[2].stars.push(star);
		}
	}

	// Parallax effect on scroll
	function handleScroll() {
		const scrolled = window.scrollY;
		layers.forEach((layer, index) => {
			const container = document.getElementById(`star-layer-${index}`);
			if (container) {
				const yOffset = scrolled * layer.speed;
				container.style.transform = `translateY(-${yOffset}px)`;
			}
		});
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

{#snippet Star({ size, x, y, animationDuration, className })}
	<div
		id="star-{x.toFixed(0)}-{y.toFixed(0)}"
		class={cn(
			'star twinkle absolute aspect-square rounded-full bg-black opacity-25 transition-transform dark:bg-white',
			className
		)}
		style="
			width: {size}px;
			height: {size}px;
			top: {y}%;
			left: {x}%;
			animation-duration: {animationDuration}ms;
		"
	></div>
{/snippet}

<div class="pointer-events-none fixed left-0 top-0 -z-50 h-screen w-full">
	{#each layers as layer, layerIndex}
		<div
			id="star-layer-{layerIndex}"
			class="absolute left-0 top-0 z-0 h-screen w-full"
			style="will-change: transform"
		>
			{#each layer.stars as star, i}
				{@render Star({
					size: star.size,
					x: star.x,
					y: star.y,
					animationDuration: star.animationDuration,
					className: i * 2 > count ? 'hidden sm:block' : 'block'
				})}
			{/each}
		</div>
	{/each}
</div>

<style>
	.twinkle {
		animation: twinkle 10s infinite;
	}

	@keyframes twinkle {
		0% {
			opacity: 0.25;
		}
		80% {
			opacity: 0.25;
		}
		90% {
			opacity: 1;
		}
		100% {
			opacity: 0.25;
		}
	}
</style>
