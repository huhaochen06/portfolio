<script lang="ts">
	import { cn } from '$lib/utils';
	import type { EmblaCarouselType } from 'embla-carousel';
	import EmblaCarousel from 'embla-carousel';
	import { onMount } from 'svelte';

	let { class: className = '' } = $props();

	const circleDegrees = 360;
	const wheelItemSize = 32;
	const wheelItemCount = 12;
	const wheelItemsInView = 3;
	const loop = true;

	let time = $state(new Date());

	// Define time zones
	const timeZones = [
		{ code: 'SGT', name: 'Singapore', zone: 'Asia/Singapore' },
		{ code: 'PST', name: 'Pacific', zone: 'America/Los_Angeles' },
		{ code: 'EST', name: 'Eastern', zone: 'America/New_York' },
		{ code: 'GMT', name: 'London', zone: 'Europe/London' },
		{ code: 'CET', name: 'Paris', zone: 'Europe/Paris' },
		{ code: 'CST', name: 'Beijing', zone: 'Asia/Shanghai' },
		{ code: 'JST', name: 'Tokyo', zone: 'Asia/Tokyo' }
	];

	// Update time every second
	$effect(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		// Cleanup on component destroy
		return () => clearInterval(interval);
	});

	// Format time for all zones
	let formattedTimes = $derived(
		timeZones.map((tz) => ({
			...tz,
			time: time.toLocaleTimeString('en-US', {
				hour: '2-digit',
				hour12: false,
				minute: '2-digit',
				second: '2-digit',
				timeZone: tz.zone
			}),
			hour: time
				.toLocaleTimeString('en-US', {
					hour: '2-digit',
					hour12: false,
					minute: '2-digit',
					second: '2-digit',
					timeZone: tz.zone
				})
				.slice(0, 2),
			minute: time
				.toLocaleTimeString('en-US', {
					hour: '2-digit',
					hour12: false,
					minute: '2-digit',
					second: '2-digit',
					timeZone: tz.zone
				})
				.slice(3, 5),
			second: time
				.toLocaleTimeString('en-US', {
					hour: '2-digit',
					hour12: false,
					minute: '2-digit',
					second: '2-digit',
					timeZone: tz.zone
				})
				.slice(6, 8)
		}))
	);

	const WHEEL_ITEM_RADIUS = circleDegrees / wheelItemCount;
	const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * wheelItemsInView;
	const WHEEL_RADIUS = Math.round(wheelItemSize / 2 / Math.tan(Math.PI / wheelItemCount));

	// State
	let emblaNode: HTMLElement;
	let emblaApi: EmblaCarouselType;
	let rootNode: HTMLElement;
	const totalRadius = $derived(formattedTimes.length * WHEEL_ITEM_RADIUS);
	const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS;

	function isInView(wheelLocation: number, slidePosition: number): boolean {
		return Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES;
	}

	function setSlideStyles(
		emblaApi: EmblaCarouselType,
		index: number,
		loop: boolean,
		slideCount: number,
		totalRadius: number
	): void {
		const slideNode = emblaApi.slideNodes()[index];
		const wheelLocation = emblaApi.scrollProgress() * totalRadius;
		const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius;
		const positionLoopStart = positionDefault + totalRadius;
		const positionLoopEnd = positionDefault - totalRadius;

		let inView = false;
		let angle = index * -WHEEL_ITEM_RADIUS;

		if (isInView(wheelLocation, positionDefault)) {
			inView = true;
		}

		if (loop && isInView(wheelLocation, positionLoopEnd)) {
			inView = true;
			angle = -circleDegrees + (slideCount - index) * WHEEL_ITEM_RADIUS;
		}

		if (loop && isInView(wheelLocation, positionLoopStart)) {
			inView = true;
			angle = -(totalRadius % circleDegrees) - index * WHEEL_ITEM_RADIUS;
		}

		if (inView) {
			slideNode.style.opacity = '1';
			slideNode.style.transform = `translateY(-${
				index * 100
			}%) rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`;
		} else {
			slideNode.style.opacity = '0';
			slideNode.style.transform = 'none';
		}
	}

	function setContainerStyles(emblaApi: EmblaCarouselType, wheelRotation: number): void {
		emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`;
	}

	function inactivateEmblaTransform(emblaApi: EmblaCarouselType) {
		if (!emblaApi) return;
		const { translate, slideLooper } = emblaApi.internalEngine();
		translate.clear();
		translate.toggleActive(false);
		slideLooper.loopPoints.forEach(({ translate }) => {
			translate.clear();
			translate.toggleActive(false);
		});
	}

	function rotateWheel(emblaApi: EmblaCarouselType) {
		const rotation = formattedTimes.length * WHEEL_ITEM_RADIUS - rotationOffset;
		const wheelRotation = rotation * emblaApi.scrollProgress();
		setContainerStyles(emblaApi, wheelRotation);
		emblaApi.slideNodes().forEach((_, index) => {
			setSlideStyles(emblaApi, index, loop, formattedTimes.length, totalRadius);
		});
	}

	onMount(() => {
		emblaApi = EmblaCarousel(emblaNode, {
			loop,
			axis: 'y',
			dragFree: true,
			containScroll: false,
			watchSlides: false
		});

		emblaApi.on('pointerUp', () => {
			const { scrollTo, target, location } = emblaApi.internalEngine();
			const diffToTarget = target.get() - location.get();
			const factor = Math.abs(diffToTarget) < wheelItemSize / 2.5 ? 10 : 0.1;
			const distance = diffToTarget * factor;
			scrollTo.distance(distance, true);
		});

		emblaApi.on('scroll', () => rotateWheel(emblaApi));

		emblaApi.on('reInit', () => {
			inactivateEmblaTransform(emblaApi);
			rotateWheel(emblaApi);
		});

		inactivateEmblaTransform(emblaApi);
		rotateWheel(emblaApi);

		return () => {
			if (emblaApi) emblaApi.destroy();
		};
	});
</script>

<div class={cn('embla overflow-hidden', className)}>
	<div class="flex min-w-[100%] items-center justify-center">
		<div
			class="flex h-full min-w-full touch-pan-x items-center overflow-hidden"
			bind:this={rootNode}
		>
			<div class="h-[32px] w-full select-none" style="perspective: 1000px;" bind:this={emblaNode}>
				<div class="h-full w-full" style="transform-style: preserve-3d; will-change: transform;">
					{#each formattedTimes as tz, index (index)}
						<div
							class="flex h-full w-full items-center justify-center text-center opacity-0"
							style="backface-visibility: hidden;"
						>
							<div
								class="flex flex-row items-center justify-center gap-2 text-base font-medium sm:flex-col sm:gap-0 sm:text-sm lg:flex-row lg:gap-2"
							>
								<p class="grid grid-cols-5">
									<span class="font-mono">{tz.hour}</span>
									<span class="text-neutral-500">:</span>
									<span class="font-mono">{tz.minute}</span>
									<span class="text-neutral-500">:</span>
									<span class="font-mono">{tz.second}</span>
								</p>
								<span class="block font-mono text-neutral-500 sm:hidden lg:block">{tz.code}</span>
								<span class="hidden font-mono text-neutral-500 sm:block lg:hidden">{tz.name}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
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
		left: 0;
		right: 0;
		content: '';
		display: block;
		height: calc(50% - 32px / 2);
		z-index: 1;
		pointer-events: none;
	}
	.embla:before {
		top: -0.5px;
		background: linear-gradient(
			to top,
			hsl(var(--background) / 0) 0%,
			hsl(var(--background) / 1) 100%
		);
	}
	.embla:after {
		bottom: -0.5px;
		background: linear-gradient(
			to bottom,
			hsl(var(--background) / 0) 0%,
			hsl(var(--background) / 1) 100%
		);
	}
</style>
