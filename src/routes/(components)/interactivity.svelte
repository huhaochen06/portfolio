<script lang="ts">
	import { Joystick } from 'lucide-svelte';
	import { CalendarDial, Clock, TypingGame } from './interactive-elements';
</script>

<div class="relative flex w-full flex-col gap-4 leading-7 text-neutral-700 dark:text-neutral-300">
	<div class="flex items-center justify-start gap-1">
		<Joystick class="size-4" />
		<h2 class="font-medium">Interactivity</h2>
	</div>
	<div class="flex flex-col gap-4">
		<div class="flex gap-4">
			<Clock class="w-[30%] rounded-md border" />
			<CalendarDial class="w-[70%] rounded-md border" />
		</div>

		<TypingGame />
	</div>
</div>
