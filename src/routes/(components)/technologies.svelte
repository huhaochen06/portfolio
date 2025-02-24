<script lang="ts">
	const technologies = [
		{
			name: 'HTML',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg'
		},
		{
			name: 'CSS',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg'
		},
		{
			name: 'TypeScript',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg'
		},
		{
			name: 'Python',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
		},
		{
			name: 'Svelte',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-plain.svg'
		},
		{
			name: 'Tailwind CSS',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
		},
		{
			name: 'Node.js',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain.svg'
		},
		{
			name: 'Docker',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg'
		}
	];
</script>

<div class="grid w-full grid-cols-4 grid-rows-2 gap-2">
	{#each technologies as technology}
		<div
			class="flex flex-col items-center justify-center gap-2 rounded-sm border bg-background p-4 shadow-sm"
		>
			<div class="flex h-6 w-6 items-center justify-center rounded-full">
				<img
					src={technology.icon}
					alt={technology.name}
					class="h-8 w-8 opacity-75"
					style="filter: brightness(0) invert(var(--image-invert));"
				/>
			</div>
			<p class="text-xs text-muted-foreground">{technology.name}</p>
		</div>
	{/each}
</div>

<style>
	:global(:root) {
		--image-invert: 0;
	}
	:global(.dark) {
		--image-invert: 1;
	}
</style>
