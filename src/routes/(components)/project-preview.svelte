<script>
	import { BlurEffect } from '$lib/components/blur-effect';
	import { cn } from '$lib/utils';

	let { project, text = true, children = undefined, class: className = undefined } = $props();

	const { slug, name, preview, date } = project;

	const resolution = {
		width: preview.base.width,
		height: preview.base.height
	};

	let externalIcon = $derived.by(() => !(project.type === 'internal' || project.mdx));

	const { placeholder, src } = preview.base;
</script>

<a
	href="/projects/{slug}"
	class={cn(
		'group h-auto w-full rounded-xl outline-none ring-neutral-950 focus-visible:ring-1 dark:ring-neutral-950',
		className
	)}
>
	<div
		class="h-auto w-full rounded-xl border border-neutral-300 bg-gradient-to-t from-neutral-300 to-neutral-200 p-1 dark:border-neutral-800 dark:from-neutral-800 dark:to-neutral-900"
	>
		<div
			class="relative h-auto w-full overflow-hidden rounded-lg"
			style="aspect-ratio: {resolution.width} / {resolution.height}"
		>
			<video
				autoplay
				muted
				playsinline
				loop
				{src}
				width={resolution.width}
				height={resolution.height}
				class="relative z-20 h-auto w-full"
				style="aspect-ratio: {resolution.width} / {resolution.height}"
			></video>
			<div
				class="absolute left-0 top-0 z-10 h-full w-full bg-cover bg-no-repeat blur-lg"
				style="background-image: url({placeholder})"
			></div>
			<div
				class="to-neutral-925 absolute left-0 top-0 z-30 h-full w-full bg-gradient-to-b from-transparent from-0% opacity-75 transition-all duration-500 group-hover:opacity-95"
			></div>
			{#if text}
				<div class="absolute left-0 top-0 z-40 h-full w-full">
					<div class="flex h-full w-full items-end justify-between p-3 sm:p-4">
						<div
							class="z-40 flex items-center justify-start gap-1 text-xs text-neutral-300 sm:text-sm"
						>
							<span>{name}</span>
							{#if externalIcon}
								<ExternalIcon />
							{/if}
						</div>
						<p class="z-40 text-xs text-neutral-400 sm:text-sm">
							{new Date(date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					</div>
					<BlurEffect direction="down" class="!top-auto bottom-0 z-10" />
				</div>
			{/if}
		</div>
	</div>
	{@render children?.()}
</a>

{#snippet ExternalIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		class="size-3 stroke-2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
		/>
	</svg>
{/snippet}
