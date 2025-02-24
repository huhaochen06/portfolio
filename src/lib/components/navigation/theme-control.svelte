<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { mode, toggleMode } from 'mode-watcher';

	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
</script>

<Button
	variant="outline"
	onclick={toggleMode}
	size="icon"
	class={cn(
		'group relative z-50 rounded-full shadow-md transition-colors duration-150 hover:text-neutral-950 focus-visible:text-neutral-950 dark:hover:text-neutral-50 dark:focus-visible:text-neutral-50'
	)}
>
	<span
		class={cn(
			'z-30 block text-sm sm:text-sm',
			'[text-shadow:_0_0_1.25rem_rgba(10,10,10,0)] dark:[text-shadow:0_0_0.75rem_rgba(250,250,250,0)]',
			'group-hover:[text-shadow:_0_0_1.25rem_rgba(10,10,10,1)] dark:group-hover:[text-shadow:0_0_0.75rem_rgba(250,250,250,1)]',
			'group-active:scale-95',
			'transition-[text-shadow, transform] duration-300'
		)}
	>
		{#if $mode === 'dark'}
			<Sun class="h-4 w-4" />
		{:else}
			<Moon class="h-4 w-4 " />
		{/if}
	</span>
</Button>
