<script>
	import { innerWidth } from 'svelte/reactivity/window';

	let { children, objects } = $props();

	let windowWidth = innerWidth;

	// Breakpoint values
	const breakpoints = {
		xs: 0,
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280
	};

	// Computed breakpoint
	let windowBreakpoint = $derived.by(() => {
		if (!windowWidth.current) return 'xl';
		if (windowWidth.current >= breakpoints.xl) return 'xl';
		if (windowWidth.current >= breakpoints.lg) return 'lg';
		if (windowWidth.current >= breakpoints.md) return 'md';
		if (windowWidth.current >= breakpoints.sm) return 'sm';
		return 'xs';
	});

	// Column data calculations
	let leftColumn = $derived(
		objects.filter((d, index) => (windowBreakpoint === 'md' ? index % 2 === 0 : index % 3 === 0))
	);

	let middleColumn = $derived(objects.filter((d, index) => index % 3 === 1));

	let rightColumn = $derived(
		objects.filter((d, index) => (windowBreakpoint === 'md' ? index % 2 !== 0 : index % 3 === 2))
	);
</script>

{#if windowBreakpoint === 'sm' || windowBreakpoint === 'xs'}
	<div class="flex flex-col items-start justify-center gap-4">
		{#each objects as obj, index (index)}
			{@render children(obj)}
		{/each}
	</div>
{:else if windowBreakpoint === 'md'}
	<div class="flex flex-row items-start justify-center gap-1">
		<div class="flex flex-1 flex-col gap-1">
			{#each leftColumn as obj, index (index)}
				{@render children(obj)}
			{/each}
		</div>
		<div class="flex flex-1 flex-col gap-1">
			{#each rightColumn as obj, index (index)}
				{@render children(obj)}
			{/each}
		</div>
	</div>
{:else}
	<div class="flex flex-row items-start justify-center gap-1">
		<div class="flex flex-1 flex-col gap-1">
			{#each leftColumn as obj, index (index)}
				{@render children(obj)}
			{/each}
		</div>
		<div class="flex flex-1 flex-col gap-1">
			{#each middleColumn as obj, index (index)}
				{@render children(obj)}
			{/each}
		</div>
		<div class="flex flex-1 flex-col gap-1">
			{#each rightColumn as obj, index (index)}
				{@render children(obj)}
			{/each}
		</div>
	</div>
{/if}
