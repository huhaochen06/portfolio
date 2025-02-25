<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	const tabs = [
		{ name: 'Home', href: '/' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Gallery', href: '/gallery' }
	];

	let pageActive = $derived((href: string) => {
		return (
			page.url.pathname === href ||
			(page.url.pathname.startsWith(href + '/') &&
				page.url.pathname.split('/').length === href.split('/').length + 1)
		);
	});

	let activeTabIndex = $derived(() => {
		return tabs.findIndex((tab) => pageActive(tab.href)) ?? 0;
	});

	let leftPosition = $derived(() => {
		const positions = ['left-0', 'left-1/3', 'left-2/3'];
		return positions[activeTabIndex()] ?? 'left-0';
	});
</script>

<div
	id="main-nav"
	class="z-50 flex items-center justify-between rounded-full shadow-md transition-all sm:w-fit"
>
	<div class="relative flex border after:bg-background" id="element">
		<div class="z-30 flex">
			{#each tabs as { name, href }, i}
				<Button
					variant="link"
					class={cn(
						'group relative rounded-full px-4 py-[calc(.5rem+1px)] outline-none transition-colors duration-150 hover:text-neutral-950 focus-visible:text-neutral-950 dark:hover:text-neutral-50 dark:focus-visible:text-neutral-50',
						pageActive(href)
							? 'text-neutral-950 dark:text-neutral-50'
							: 'text-neutral-500 dark:text-neutral-400'
					)}
					{href}
				>
					<span
						class={cn(
							'z-30 block text-sm sm:text-sm',
							'[text-shadow:_0_0_1.25rem_rgba(10,10,10,0)] dark:[text-shadow:0_0_0.75rem_rgba(250,250,250,0)]',
							'group-hover:[text-shadow:_0_0_1.25rem_rgba(10,10,10,1)] dark:group-hover:[text-shadow:0_0_0.75rem_rgba(250,250,250,1)]',
							'group-active:scale-95',
							'transition-[text-shadow, transform] duration-300',
							pageActive(href) &&
								'[text-shadow:_0_0_1.25rem_rgba(10,10,10,1)] dark:[text-shadow:0_0_0.75rem_rgba(250,250,250,1)]'
						)}
					>
						{name}
					</span>
				</Button>
			{/each}
		</div>
	</div>
	<div
		class={cn(
			'absolute left-0 top-[90%] z-10 h-16 w-16 bg-gradient-to-r from-transparent via-black/30 to-transparent blur-lg transition-all duration-700 dark:top-[80%] dark:via-white/80',
			leftPosition()
		)}
	></div>
	<div
		class={cn(
			'absolute left-0 top-[50%] h-16 w-16 bg-gradient-to-r from-transparent via-black to-transparent blur-lg transition-all duration-700 dark:via-white',
			leftPosition()
		)}
	></div>
</div>

<style>
	#main-nav {
		overflow: hidden;
		position: relative;
	}

	#element {
		position: relative;
		border-radius: 9999px;
	}

	#element::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 9999px;
		pointer-events: none;
		z-index: 1;
	}
</style>
