<script lang="ts">
	import { Masonry } from '$lib/components/masonry';
	import { projects } from '$lib/data/projects/projects';
	import ProjectPreview from '../(components)/project-preview.svelte';
</script>

<div
	class="relative flex w-full items-start justify-center px-4 pb-28 pt-4 sm:items-center sm:px-8 sm:pb-28 sm:pt-8 md:px-20 md:pb-16 lg:items-start lg:py-[7.75rem] lg:pb-16 xl:px-0"
>
	<div class="grid h-full w-full max-w-screen-xl">
		<div class="grid-sizer w-full sm:w-[calc(50%-8px)] md:w-[calc(33.3333%-8px)]"></div>

		<Masonry objects={projects}>
			{#snippet children(project: any)}
				<ProjectPreview {project} class="grid-item w-full "></ProjectPreview>
			{/snippet}
		</Masonry>
	</div>
</div>
