<script lang="ts">
	import { BookOpen } from 'lucide-svelte';
</script>

<div class="relative flex w-full flex-col gap-4 leading-7 text-neutral-700 dark:text-neutral-300">
	<div class="flex items-center justify-start gap-1">
		<BookOpen class="size-4" />
		<h2 class="font-medium">Education</h2>
	</div>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div class="flex w-full flex-col gap-4 pb-0">
			<div class="flex w-full flex-col items-start justify-start gap-0">
				<h3 class="text-balance font-medium">
					PG Diploma in Web and Mobile App Design and Development
				</h3>
				<p class="text-sm text-muted-foreground/80">Langara College / 2020 - 2022</p>
			</div>
		</div>
		<div class="flex w-full flex-col gap-4 pb-0">
			<div class="flex w-full flex-col items-start justify-start gap-0">
				<h3 class="text-balance font-medium">Bachelor of Technology in Information Technology</h3>
				<p class="text-sm text-muted-foreground/80">Manipal University Jaipur / 2015 - 2019</p>
			</div>
		</div>
	</div>
</div>
