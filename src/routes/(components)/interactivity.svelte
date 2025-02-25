<script lang="ts">
	import { Joystick } from 'lucide-svelte';
	import { Clock, TypingGame } from './interactive-elements';
	import CalendarDial from './interactive-elements/calendar-dial.svelte';
	import Test from './interactive-elements/test.svelte';

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
</script>

<div class="relative flex w-full flex-col gap-4 leading-7 text-neutral-700 dark:text-neutral-300">
	<div class="flex items-center justify-start gap-1">
		<Joystick class="size-4" />
		<h2 class="font-medium">Interactivity</h2>
	</div>
	<div class="flex flex-col gap-4">
		<div class="flex gap-4">
			<!-- <Clock class="w-[30%] rounded-md border p-4" /> -->
			<Test
				slides={formattedTimes}
				loop
				wheelItemsInView={2}
				wheelItemCount={12}
				class="w-[30%] rounded-md border"
			>
				{#snippet children(tz: any)}
					<div
						class="flex flex-row items-center justify-center gap-2 font-mono text-base font-medium sm:flex-col sm:gap-0 sm:text-sm lg:flex-row lg:gap-2"
					>
						<p class="font-sans">
							<span class="font-mono">{tz.hour}</span>
							<span class=" text-neutral-500">:</span>
							<span class="font-mono">{tz.minute}</span>
							<span class=" text-neutral-500">:</span>
							<span class="font-mono">{tz.second}</span>
						</p>
						<span class="block text-neutral-500 sm:hidden lg:block">{tz.code}</span>
						<span class="hidden text-neutral-500 sm:block lg:hidden">{tz.name}</span>
					</div>
				{/snippet}
			</Test>
			<CalendarDial class="w-[70%] rounded-md border p-4" />
		</div>

		<TypingGame class="" />
	</div>
</div>
