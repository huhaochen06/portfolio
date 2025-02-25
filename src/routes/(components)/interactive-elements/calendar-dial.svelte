<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { cn } from '$lib/utils';

	let { class: className = '' } = $props();

	function generateDates(days = 14) {
		const result = [];
		const today = new Date();

		for (let i = -days / 2; i < days / 2; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			result.push({
				date,
				dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
				dayNumber: date.getDate(),
				monthName: date.toLocaleDateString('en-US', { month: 'short' })
			});
		}

		return result;
	}

	let dates = $derived(generateDates());
	let currentDate = $derived(new Date());
</script>

<div class={cn('embla overflow-hidden', className)}>
	<Carousel.Root
		class="flex h-full min-w-full touch-pan-y items-center overflow-hidden"
		opts={{ loop: true, dragFree: true, startIndex: 7 }}
	>
		<Carousel.Content class="select-none">
			{#each dates as date, index (index)}
				<Carousel.Item class="basis-1/4  pt-4">
					<div class="relative overflow-hidden rounded-t-md">
						<div
							class={cn(
								'relative flex h-full w-full items-center justify-center rounded-t-md border-x border-t pb-2 pt-2 text-center text-neutral-500 after:bg-background dark:text-neutral-400',
								date.dayNumber === currentDate.getDate() &&
									'current-date text-neutral-950 [text-shadow:_0_0_1.25rem_rgba(10,10,10,1)] dark:text-neutral-50 dark:[text-shadow:0_0_0.75rem_rgba(250,250,250,1)]'
							)}
						>
							<div class="z-30 flex">
								<div class="flex flex-col items-center justify-center gap-2">
									<span class="font-mono text-2xl">{date.dayNumber}</span>
									<span class="font-mono">{date.dayName}</span>
								</div>
							</div>
						</div>
						{#if date.dayNumber === currentDate.getDate()}
							<div
								class={cn(
									'absolute left-0 top-[90%] z-10 h-16 w-16 bg-gradient-to-r from-transparent via-black/30 to-transparent blur-lg transition-all duration-700 dark:top-[80%] dark:via-white/60'
								)}
							></div>
							<div
								class={cn(
									'absolute right-0 top-[5%] h-16 w-16 bg-gradient-to-r from-transparent via-black to-transparent blur-lg transition-all duration-700 dark:via-white'
								)}
							></div>
							<div
								class={cn(
									'absolute left-0 top-[60%] h-16 w-16 bg-gradient-to-r from-transparent via-black to-transparent blur-lg transition-all duration-700 dark:via-white'
								)}
							></div>
						{/if}
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</Carousel.Root>
</div>

<style>
	.embla {
		position: relative;
		display: flex;
		justify-content: center;
	}
	.embla:before,
	.embla:after {
		position: absolute;
		top: 0;
		bottom: 0;
		content: '';
		display: block;
		width: calc(50% - 100px / 2);
		z-index: 1;
		pointer-events: none;
	}
	.embla:before {
		left: -0.5px;
		background: linear-gradient(
			to left,
			hsl(var(--background) / 0) 20%,
			hsl(var(--background) / 1) 100%
		);
	}
	.embla:after {
		right: -0.5px;
		background: linear-gradient(
			to right,
			hsl(var(--background) / 0) 20%,
			hsl(var(--background) / 1) 100%
		);
	}

	.current-date::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 0.35rem 0.35rem 0 0;
		pointer-events: none;
		z-index: 1;
	}
</style>
