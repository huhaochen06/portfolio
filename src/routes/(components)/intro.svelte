<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { DownloadIcon } from 'lucide-svelte';
</script>

<div class="flex w-full items-center justify-between">
	<div class="flex items-center justify-start gap-4">
		<Avatar.Root
			class="relative h-16 w-16 border ring-1 ring-muted-foreground/50 ring-offset-2 ring-offset-background"
		>
			<Avatar.Image src="/avatar.webp" alt="@huhaochen06" />
			<Avatar.Fallback>HC</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col items-start justify-center">
			<h1 class="font-medium">Hu HaoChen</h1>
			<p class="text-sm text-muted-foreground">Aspiring Software Developer</p>
		</div>
	</div>
	<div class="flex items-center justify-end">
		<Button
			variant="outline"
			href="/Hu HaoChen Resume.pdf"
			class="rounded-full"
			target="_blank"
			aria-label="download resume"
		>
			Resume <DownloadIcon />
		</Button>
	</div>
</div>

<div class="flex w-full flex-col items-center justify-between gap-2 leading-7">
	<p class="highlight-paragraph w-full">
		I am a <span class="highlight-text">student </span> based
		<span class="highlight-text"> in Singapore</span>,
		<span class="highlight-text">aspiring </span> to become a
		<span class="highlight-text">software developer</span>. I am passionate about building
		<span class="highlight-text">creative and interactive web applications</span>. Outside of
		programming, I enjoy making 3D experiences and photography.
	</p>
</div>

<style>
	.highlight-paragraph {
		transition: color 0.3s ease-in-out;
		transition-delay: 0.2s;
	}

	.highlight-paragraph:hover {
		color: hsl(var(--muted-foreground) / 0.5);
	}

	.highlight-text {
		position: relative;
		display: inline-block;
		transition: color 0.3s ease-in-out;
		transition-delay: 0.2s;
	}

	.highlight-paragraph:hover .highlight-text {
		color: hsl(var(--accent-foreground)) !important;
	}

	.highlight-text::after {
		content: '';
		position: absolute;
		left: -2px;
		bottom: 1px;
		width: calc(100% + 4px);
		height: 0;
		background-color: white;
		transition: height 0.3s ease-in-out;
		z-index: 5;
		mix-blend-mode: difference;
	}

	.highlight-text:nth-child(1)::after {
		transition-delay: 0.2s;
	}
	.highlight-text:nth-child(2)::after {
		transition-delay: 0.25s;
	}
	.highlight-text:nth-child(3)::after {
		transition-delay: 0.3s;
	}
	.highlight-text:nth-child(4)::after {
		transition-delay: 0.35s;
	}
	.highlight-text:nth-child(5)::after {
		transition-delay: 0.4s;
	}

	.highlight-paragraph:hover .highlight-text::after {
		height: 86%;
	}
</style>
