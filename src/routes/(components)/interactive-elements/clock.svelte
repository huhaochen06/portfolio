<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { cn } from '$lib/utils';

	let api = $state<CarouselAPI>();
	let time = $state(new Date());
	let { class: className = '' } = $props();

	// Define time zones
	const timeZones = [
		{ code: 'SGT', name: 'Singapore', zone: 'Asia/Singapore' },
		{ code: 'PST', name: 'Pacific', zone: 'America/Los_Angeles' },
		{ code: 'EST', name: 'Eastern', zone: 'America/New_York' },
		{ code: 'GMT', name: 'London', zone: 'Europe/London' }
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

	const CIRCLE_DEGREES = 360;
	const WHEEL_ITEM_SIZE = 32;
	const WHEEL_ITEM_COUNT = 18;
	const WHEEL_ITEMS_IN_VIEW = 4;

	export const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT;
	export const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW;
	export const WHEEL_RADIUS = Math.round(
		WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT)
	);

	const isInView = (wheelLocation: number, slidePosition: number): boolean =>
		Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES;

	const setSlideStyles = (
		emblaApi: CarouselAPI,
		index: number,
		loop: boolean,
		slideCount: number,
		totalRadius: number
	): void => {
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
			angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS;
		}

		if (loop && isInView(wheelLocation, positionLoopStart)) {
			inView = true;
			angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS;
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
	};

	export const setContainerStyles = (emblaApi: CarouselAPI, wheelRotation: number): void => {
		emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`;
	};

	function inactivateEmblaTransform(emblaApi: CarouselAPI) {
		if (!emblaApi) return;
		const { translate, slideLooper } = emblaApi.internalEngine();
		translate.clear();
		translate.toggleActive(false);
		slideLooper.loopPoints.forEach(({ translate }) => {
			translate.clear();
			translate.toggleActive(false);
		});
	}

	function rotateWheel(emblaApi: CarouselAPI) {
		const rotation = formattedTimes.length * WHEEL_ITEM_RADIUS - rotationOffset;
		const wheelRotation = rotation * emblaApi.scrollProgress();
		setContainerStyles(emblaApi, wheelRotation);
		emblaApi.slideNodes().forEach((_, index) => {
			setSlideStyles(emblaApi, index, false, formattedTimes.length, totalRadius);
		});
	}

	$effect(() => {
		if (!api) return;

		api.on('pointerUp', (emblaApi) => {
			const { scrollTo, target, location } = emblaApi.internalEngine();
			const diffToTarget = target.get() - location.get();
			const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1;
			const distance = diffToTarget * factor;
			scrollTo.distance(distance, true);
		});

		api.on('scroll', rotateWheel);

		api.on('reInit', (emblaApi) => {
			inactivateEmblaTransform(emblaApi);
			rotateWheel(emblaApi);
		});

		inactivateEmblaTransform(api);
		rotateWheel(api);
	});

	const totalRadius = $derived(formattedTimes.length * WHEEL_ITEM_RADIUS);
	const rotationOffset = WHEEL_ITEM_RADIUS;
</script>

<Carousel.Root
	orientation="vertical"
	class={cn('relative w-full select-none items-center overflow-hidden', className)}
	setApi={(emblaApi) => (api = emblaApi)}
	opts={{
		dragFree: true,
		containScroll: false,
		watchSlides: false,
		axis: 'y'
	}}
	style="perspective: 1000px;"
>
	<Carousel.Content
		class="h-full w-full"
		style="transform-style: preserve-3d; will-change: transform;"
	>
		<div class="flex flex-col gap-2">
			{#each formattedTimes as tz}
				<Carousel.Item
					class="min-w-max basis-1/3"
					style="backface-visibility: hidden; opacity: 0; display: inline-block;"
				>
					<div
						class="flex flex-row items-center justify-center gap-2 text-center text-base font-medium sm:flex-col sm:gap-0 sm:text-sm lg:flex-row lg:gap-2"
					>
						<p>
							<span>{tz.hour}</span>
							<span class="text-neutral-500">:</span>
							<span>{tz.minute}</span>
							<span class="text-neutral-500">:</span>
							<span>{tz.second}</span>
						</p>
						<span class="block text-neutral-500 sm:hidden lg:block">{tz.code}</span>
						<span class="hidden text-neutral-500 sm:block lg:hidden">{tz.name}</span>
					</div>
				</Carousel.Item>
			{/each}
		</div>
	</Carousel.Content>
</Carousel.Root>
