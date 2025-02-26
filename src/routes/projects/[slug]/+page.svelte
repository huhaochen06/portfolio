<script>
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowLeftIcon, ExternalLink } from 'lucide-svelte';

	let { data } = $props();

	const { name, date, preview, technologies, href } = data.meta;
	const { PostContent, previousProject, nextProject } = data;
</script>

<main
	class="relative flex w-full items-start justify-center px-4 pb-28 pt-16 sm:items-center sm:px-8 sm:pt-8 lg:items-start lg:pb-16 lg:pt-[9.6875rem] xl:px-0"
>
	<div class="flex h-full w-full max-w-screen-xl items-start justify-center">
		<div class="hidden flex-1 items-start justify-start lg:flex">
			<Button
				variant="link"
				href="/projects"
				target="_self"
				class="-mt-1 flex items-center gap-1 rounded-full pr-2 pt-0"
				aria-label="go to projects page"
			>
				<ArrowLeftIcon class="size-4"></ArrowLeftIcon>
				<span class="font-medium">Projects</span>
			</Button>
		</div>
		<div
			class="relative flex w-full max-w-screen-sm flex-col items-center justify-start gap-4 sm:gap-8"
		>
			<div class="grid w-full grid-cols-2">
				<div class="flex flex-col gap-0.5">
					<h1 class="w-full text-left font-medium">
						{name}
					</h1>
					<p class="text-sm text-muted-foreground/80">
						{date}
					</p>
				</div>
				<div class="flex items-center justify-end">
					<Button variant="outline" class="rounded-full" href={href.url} target="_blank">
						{href.type === 'github' ? 'GitHub' : 'Visit'}
						<ExternalLink class="size-4" />
					</Button>
				</div>
			</div>

			<div
				class="relative w-full overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-800"
				style="aspect-ratio: {preview.base.width}/{preview.base.height}"
			>
				<video
					autoPlay
					muted
					playsInline
					loop
					src={preview.base.src}
					width={preview.base.width}
					height={preview.base.height}
					class="relative z-20 h-auto w-full"
					preload="auto"
					style="aspect-ratio: {preview.base.width}/{preview.base.height}"
				></video>
				<div
					class="absolute left-0 top-0 z-10 h-full w-full bg-cover bg-no-repeat blur-xl"
					style=" background-image: url({preview.base.placeholder}); aspect-ratio: {preview.base
						.width}/{preview.base.height}"
				></div>
			</div>

			<div class="flex w-full flex-col items-start justify-start gap-2">
				<h2 class="text-sm text-muted-foreground/80">Tech Stack</h2>
				<div class="flex w-full flex-wrap items-center justify-start gap-2">
					{#each technologies as technology}
						<Badge variant="secondary" class="font-mono font-normal text-muted-foreground">
							{technology}
						</Badge>
					{/each}
				</div>
			</div>
			{#if PostContent}
				<Separator />
				<div
					class="prose prose-neutral w-full dark:prose-invert prose-figcaption:text-center prose-img:rounded-lg prose-img:border"
				>
					<PostContent />
				</div>
			{/if}
			<Separator />
			<div class="relative flex w-full items-start justify-between text-sm">
				<div>
					{#if previousProject}
						<Button
							href={`/projects/${previousProject.slug}`}
							class="flex flex-col items-start p-0"
							variant="link"
							target="_self"
							aria-label={`go to previous project: ${previousProject.name}`}
						>
							<span class="leading-none text-muted-foreground/60">Previous</span>
							<span class="font-medium text-primary">
								{previousProject.name}
							</span>
						</Button>
					{/if}
				</div>
				<div>
					{#if nextProject}
						<Button
							href={`/projects/${nextProject.slug}`}
							target="_self"
							class="flex flex-col items-end p-0"
							variant="link"
							aria-label={`go to next project: ${nextProject.name}`}
						>
							<span class="leading-none text-muted-foreground/60">Next</span>
							<span class="font-medium text-primary">
								{nextProject.name}
							</span>
						</Button>
					{/if}
				</div>
			</div>
		</div>
		<div class="hidden flex-1 lg:flex"></div>
	</div>
</main>
