<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { projects } from '$lib/data/projects/projects';
	import { FolderKanban } from 'lucide-svelte';
	import ProjectPreview from './project-preview.svelte';
</script>

<div class="relative flex w-full flex-col gap-4 leading-7">
	<div class="flex justify-between">
		<div class="flex items-center justify-start gap-1">
			<FolderKanban class="size-4" />
			<h2 class="font-medium">Recent Projects</h2>
		</div>
		<Button href="/projects" variant="link">More Projects →</Button>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each projects.slice(0, 2) as project}
			<ProjectPreview
				project={{
					...project,
					preview: {
						base: {
							...project.preview.base,
							width: 550,
							height: 333
						}
					}
				}}
				text={false}
			>
				<div class="pt-1">
					<h3 class="text-balance font-medium">{project.name}</h3>
					<p class="text-sm text-muted-foreground/80">{project.description}</p>
				</div>
			</ProjectPreview>
		{/each}
	</div>
</div>
