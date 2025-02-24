<script>
	import { cn } from '$lib/utils';

	let { layerCount = 5, direction = undefined, class: className = undefined } = $props();

	const blurStep = 100 / (layerCount + 1);

	function generateLayers() {
		return Array.from({ length: layerCount }, (_, i) => {
			const backdropFilter = `blur(${i + 1}px)`;

			let mask;
			if (direction) {
				// Handle specific directions
				switch (direction) {
					case 'down':
						mask = `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${0 + i * blurStep}%, rgba(0, 0, 0, 1) ${
							blurStep + i * blurStep
						}%, rgba(0, 0, 0, 1) ${blurStep * 2 + i * blurStep}%, rgba(0, 0, 0, 0) ${
							blurStep * 3 + i * blurStep
						}%)`;
						break;
					case 'up':
						mask = `linear-gradient(to top, rgba(0, 0, 0, 0) ${0 + i * blurStep}%, rgba(0, 0, 0, 1) ${
							blurStep + i * blurStep
						}%, rgba(0, 0, 0, 1) ${blurStep * 2 + i * blurStep}%, rgba(0, 0, 0, 0) ${
							blurStep * 3 + i * blurStep
						}%)`;
						break;
					case 'left':
						mask = `linear-gradient(to left, rgba(0, 0, 0, 0) ${0 + i * blurStep}%, rgba(0, 0, 0, 1) ${
							blurStep + i * blurStep
						}%, rgba(0, 0, 0, 1) ${blurStep * 2 + i * blurStep}%, rgba(0, 0, 0, 0) ${
							blurStep * 3 + i * blurStep
						}%)`;
						break;
					case 'right':
						mask = `linear-gradient(to right, rgba(0, 0, 0, 0) ${0 + i * blurStep}%, rgba(0, 0, 0, 1) ${
							blurStep + i * blurStep
						}%, rgba(0, 0, 0, 1) ${blurStep * 2 + i * blurStep}%, rgba(0, 0, 0, 0) ${
							blurStep * 3 + i * blurStep
						}%)`;
						break;
				}
				return {
					index: i,
					backdropFilter,
					mask
				};
			}

			// Default behavior (responsive up/down)
			return {
				index: i,
				backdropFilter,
				maskDesktop: `linear-gradient(to top, rgba(0, 0, 0, 0) ${0 + i * blurStep}%, rgba(0, 0, 0, 1) ${
					blurStep + i * blurStep
				}%, rgba(0, 0, 0, 1) ${blurStep * 2 + i * blurStep}%, rgba(0, 0, 0, 0) ${
					blurStep * 3 + i * blurStep
				}%)`,
				maskMobile: `linear-gradient(to bottom, rgba(0, 0, 0, 0) ${0 + i * blurStep}%, rgba(0, 0, 0, 1) ${
					blurStep + i * blurStep
				}%, rgba(0, 0, 0, 1) ${blurStep * 2 + i * blurStep}%, rgba(0, 0, 0, 0) ${
					blurStep * 3 + i * blurStep
				}%)`
			};
		});
	}
</script>

<div
	class={cn('absolute -bottom-8 left-1/2 z-40 h-16 w-lvw -translate-x-1/2 lg:-top-8', className)}
>
	{#each generateLayers() as layer (layer.index)}
		{#if direction}
			<div
				class="absolute inset-0"
				style:z-index={layer.index}
				style:backdrop-filter={layer.backdropFilter}
				style:-webkit-backdrop-filter={layer.backdropFilter}
				style:mask={layer.mask}
				style:-webkit-mask={layer.mask}
			></div>
		{:else}
			<div
				class="absolute inset-0 hidden lg:block"
				style:z-index={layer.index}
				style:backdrop-filter={layer.backdropFilter}
				style:-webkit-backdrop-filter={layer.backdropFilter}
				style:mask={layer.maskDesktop}
				style:-webkit-mask={layer.maskDesktop}
			></div>
			<div
				class="absolute inset-0 block lg:hidden"
				style:z-index={layer.index}
				style:backdrop-filter={layer.backdropFilter}
				style:-webkit-backdrop-filter={layer.backdropFilter}
				style:mask={layer.maskMobile}
				style:-webkit-mask={layer.maskMobile}
			></div>
		{/if}
	{/each}
</div>
