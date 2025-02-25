<script lang="ts">
	import { cn } from '$lib/utils';
	import { Spring } from 'svelte/motion';
	import { blur } from 'svelte/transition';
	import { GameStore, type Technology } from './game-store.svelte';
	import { technologies } from './index';

	const game = new GameStore(technologies);
	const coords = new Spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.2,
			damping: 0.5
		}
	);

	let showCursor = $state(false);
	let containerRef: HTMLDivElement;

	function handleMouseMove(event: MouseEvent) {
		const container = event.currentTarget as HTMLElement;
		const rect = container.getBoundingClientRect();

		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		coords.set({ x, y });
	}

	function onFirstEnter(event: MouseEvent) {
		const container = event.currentTarget as HTMLElement;
		const rect = container.getBoundingClientRect();

		coords.set({ x: event.clientX - rect.left, y: event.clientY - rect.top }, { instant: true });
		showCursor = true;
	}

	function onFirstLeave() {
		showCursor = false;
	}

	$effect(() => {
		if (game.state.gameStarted) {
			const handleClickOutside = (event: MouseEvent) => {
				if (containerRef && !containerRef.contains(event.target as Node)) {
					game.restart();
				}
			};
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<div class="relative w-full">
	<div
		bind:this={containerRef}
		role="presentation"
		class="relative mb-2 grid w-full cursor-none select-none grid-cols-4 grid-rows-2 gap-2 overflow-hidden"
		onmousemove={handleMouseMove}
		onmouseenter={onFirstEnter}
		onmouseleave={onFirstLeave}
		onkeydown={(e) => {
			e.preventDefault();
			e.stopPropagation();
			if (e.key === 'Tab' && !game.state.animating) {
				game.restart();
				game.handleTechnologyClick(0);
			}
		}}
	>
		<div
			class={cn(
				'pointer-events-none absolute z-50 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[9999px] border-2 border-background bg-foreground ring-1 ring-foreground transition-transform',
				showCursor ? 'scale-100' : 'scale-0'
			)}
			style="left: {coords.current.x}px; top: {coords.current.y}px;"
		></div>

		{#each technologies as technology, index}
			{@render technologyButton(technology, index)}
		{/each}
	</div>

	<div
		class={cn(
			'absolute -bottom-7 left-0 right-0 flex h-8 items-center justify-between  transition-all duration-300',
			game.state.gameStarted ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
		)}
	>
		<div
			class={cn(
				'relative flex items-center gap-1 font-mono text-xs',
				game.state.gameLost ? ' animate-pulse' : ''
			)}
		>
			<kbd class="rounded border bg-accent px-1.5">TAB</kbd>- restart
		</div>
		{#key game.state.message}
			<div class="absolute right-0 z-10 font-mono text-xs" transition:blur>
				{game.state.message}
			</div>
		{/key}
	</div>
</div>

{#snippet technologyButton(technology: Technology, index: number)}
	<button
		tabindex={game.state.allowInput ? 0 : -1}
		aria-disabled={!game.state.allowInput}
		onclick={(e) => {
			if (!game.state.allowInput) {
				e.preventDefault();
				return;
			}
			game.handleTechnologyClick(index);
		}}
		class={cn(
			'group relative flex cursor-none flex-col items-center justify-center gap-2 rounded-md border bg-background p-4 shadow-sm outline-none transition-all',
			game.state.allowInput && 'hover:bg-foreground/10',
			game.state.selectedTechnologies.includes(index) ? 'border-muted-foreground/80 bg-muted' : '',
			game.state.stageWon && game.state.selectedTechnologies.includes(index)
				? 'border-green-500/70 bg-green-500/10'
				: '',
			game.state.wrongTechnologies.includes(index) ? 'border-red-500/70 bg-red-500/10' : '',
			game.state.gameWon ? 'border-purple-500/70 bg-purple-500/10' : ''
		)}
	>
		{#if game.state.selectedTechnologies.includes(index) && !game.state.animating}
			<span class="absolute left-2 top-2 font-mono text-xs text-muted-foreground" transition:blur>
				{game.state.selectedTechnologies.indexOf(index) + 1}
			</span>
		{/if}
		<div class="flex h-6 w-6 items-center justify-center rounded-full">
			<img
				src={technology.icon}
				alt={technology.name}
				class={cn(
					'h-8 w-8 opacity-75 transition-all',
					game.state.allowInput && 'group-hover:!brightness-100',
					game.state.selectedTechnologies.includes(index) ? '!brightness-100' : 'brightness-0'
				)}
				style="filter: brightness(0) invert(var(--image-invert));"
			/>
		</div>
		<p class="text-xs text-muted-foreground">{technology.name}</p>
	</button>
{/snippet}

<style>
	:global(:root) {
		--image-invert: 0;
	}
	:global(.dark) {
		--image-invert: 1;
	}
</style>
