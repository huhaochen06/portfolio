<script lang="ts">
	import { cn } from '$lib/utils';
	import { blur } from 'svelte/transition';

	let { class: className = '' } = $props();

	let text = $state('The quick brown fox jumps over the lazy dog.');
	let placeholder = $state('Start typing here...');
	let input = $state('');
	let startTime = $state<number | null>(null);
	let isComplete = $state(false);
	let currentTime = $state(Date.now());

	// Update currentTime every 16ms (roughly 60fps) when typing is active
	$effect(() => {
		if (!startTime || isComplete) return;

		const interval = setInterval(() => {
			currentTime = Date.now();
		}, 16);

		return () => clearInterval(interval);
	});

	// Add formatted time derived value
	let elapsedTime = $derived.by(() => {
		if (!startTime) return '0.000';
		const elapsed = Math.max(currentTime - startTime, 0) / 1000;
		return elapsed.toFixed(3);
	});

	function onComplete() {
		isComplete = true;

		// Start random interval animations
		const startTime = Date.now();
		const duration = 4000;

		function animate() {
			const now = Date.now();
			if (now - startTime < duration) {
				setImageIndex();
				// Random interval between 50ms and 150ms
				const nextInterval = 100 + Math.random() * 200;
				setTimeout(animate, nextInterval);
			}
		}

		// Start the animation chain
		animate();

		setTimeout(() => {
			input = '';
			placeholder = 'Bongo Cat is celebrating!';
		}, 500);

		setTimeout(() => {
			restart();
		}, 5000);
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		input = target.value;

		if (input === text) {
			onComplete();
		}

		if (!startTime && input.length === 1) {
			startTime = Date.now();
		}
	}

	function restart() {
		input = '';
		placeholder = 'Start typing here...';
		startTime = null;
		isComplete = false;
	}

	let bongoCat = $state<HTMLImageElement>() as HTMLImageElement;
	const IMAGES = ['/bongo-cat/none.png', '/bongo-cat/left.png', '/bongo-cat/right.png'];
	let active_index = 0;
	let last_index = 2;
	let timeout = setTimeout(() => {}, 0);

	function setImage() {
		bongoCat.setAttribute('src', IMAGES[active_index]);
	}

	function setImageIdle() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			active_index = 0;
			setImage();
		}, 100);
	}

	function setImageIndex() {
		if (last_index == 1) {
			active_index = 2;
			last_index = 2;
		} else if (last_index == 2) {
			active_index = 1;
			last_index = 1;
		}

		setImageIdle();
		setImage();
	}
</script>

<div class={cn('relative flex flex-col rounded-lg border p-4 px-8 py-6', className)}>
	<div class="text-md grid whitespace-nowrap pt-2">
		{#if isComplete}
			<span class="col-start-1 col-end-2 row-start-1 row-end-2 text-primary" transition:blur>
				Great job! You took {elapsedTime} seconds 🎉
			</span>
		{:else}
			<p class="col-start-1 col-end-2 row-start-1 row-end-2" transition:blur>
				{#each text.split('') as char, i}
					{#if i < input.length}
						<span class:text-primary={char === input[i]} class:text-red-500={char !== input[i]}>
							{char}
						</span>
					{:else}
						<span class="text-muted-foreground/80">{char}</span>
					{/if}
				{/each}
			</p>
		{/if}
	</div>

	<input
		class="focus-visible:outline-hidden peer mt-[8px] flex h-10 w-full rounded-md border-[3px] border-black bg-background px-3 py-7 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-100 dark:border-primary/15 dark:bg-muted sm:text-base md:text-sm"
		{placeholder}
		value={input}
		oninput={handleInput}
		onkeydown={(e) => {
			if (e.key === 'Tab') {
				e.preventDefault();
				restart();
			}
			setImageIndex();
		}}
		disabled={isComplete}
	/>
	<div
		class="mt-2 flex items-center justify-between opacity-0 blur-sm transition-all duration-300 peer-focus:opacity-100 peer-focus:blur-0"
	>
		<div class="flex items-center gap-1 font-mono text-xs">
			<kbd class="rounded border bg-accent px-1.5">TAB</kbd>- restart
		</div>
		<div class="relative z-10 font-mono text-xs">
			{elapsedTime}
		</div>
	</div>
	<img
		bind:this={bongoCat}
		alt="Bongo Cat"
		class="pointer-events-none absolute -top-[4px] right-[40px] w-[8rem] -rotate-[13.2deg] dark:-top-[6px] sm:-top-[45px] sm:right-[45px] sm:w-[200px] dark:sm:-top-[48px]"
		src="/bongo-cat/none.png"
	/>
</div>
