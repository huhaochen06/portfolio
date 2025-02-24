<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import Education from './(components)/education.svelte';
	import Intro from './(components)/intro.svelte';
	import Projects from './(components)/projects.svelte';
	import Technologies from './(components)/technologies.svelte';
</script>

<div
	class="relative flex w-full items-start justify-center px-4 pb-28 pt-16 sm:items-center sm:px-8 sm:pb-28 sm:pt-8 lg:items-start lg:pb-16 lg:pt-[9.6875rem] xl:px-0"
>
	<div
		class="relative flex h-full w-full max-w-screen-sm flex-col items-center justify-start gap-8"
	>
		<Intro />
		<Technologies />
		<Separator />
		<Projects />
		<Separator />
		<Education />
		<Separator />
		<div class="h-[500px] w-full"></div>
	</div>
</div>
