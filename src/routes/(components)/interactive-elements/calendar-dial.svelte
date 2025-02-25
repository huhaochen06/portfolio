<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { cn } from '$lib/utils';

	let { class: className = '' } = $props();

	// State for dates and rotation
	let api = $state<CarouselAPI>();
	let current = $state(0);
	let dates = $state(generateDates());

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
		const rotation = dates.length * WHEEL_ITEM_RADIUS - rotationOffset;
		const wheelRotation = rotation * emblaApi.scrollProgress();
		setContainerStyles(emblaApi, wheelRotation);
		emblaApi.slideNodes().forEach((_, index) => {
			setSlideStyles(emblaApi, index, false, dates.length, totalRadius);
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

		// Previous effect for current selection
		current = api.selectedScrollSnap() + 1;
		api.on('select', () => {
			current = api!.selectedScrollSnap() + 1;
		});
	});

	const totalRadius = dates.length * WHEEL_ITEM_RADIUS;
	const rotationOffset = WHEEL_ITEM_RADIUS;
</script>

<Carousel.Root
	class={cn('relative w-full select-none items-center  overflow-hidden', className)}
	setApi={(emblaApi) => (api = emblaApi)}
	opts={{
		dragFree: true,
		containScroll: false,
		watchSlides: false
	}}
	style="perspective: 1000px;"
>
	<Carousel.Content
		class="h-full w-full"
		style="transform-style: preserve-3d; will-change: transform;"
	>
		{#each dates as date, i}
			<Carousel.Item class="min-w-max  basis-1/3" style="backface-visibility: hidden; opacity: 0;">
				<div
					class={cn(
						'flex flex-col items-center justify-center rounded-xl bg-white/10 p-4 backdrop-blur-sm',
						'border border-white/20 shadow-lg transition-all duration-300',
						current === i && 'scale-110 bg-white/20'
					)}
				>
					<span class="text-sm font-medium text-white/80">{date.dayName}</span>
					<span class="text-2xl font-bold text-white">{date.dayNumber}</span>
					<span class="text-sm font-medium text-white/80">{date.monthName}</span>
				</div>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
</Carousel.Root>
