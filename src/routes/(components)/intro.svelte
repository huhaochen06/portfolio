<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { DownloadIcon } from 'lucide-svelte';
</script>

<div class="flex w-full items-center justify-between">
	<div class="flex items-center justify-start gap-4">
		<Avatar.Root class="relative h-16 w-16">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col items-start justify-center">
			<h1 class="font-medium">Hu HaoChen</h1>
			<p class="text-sm text-muted-foreground">Aspiring Software Developer</p>
		</div>
	</div>
	<div class="flex items-center justify-end">
		<Button
			variant="outline"
			href="/resume.pdf"
			class="rounded-full"
			target="_blank"
			aria-label="download resume"
		>
			Resume <DownloadIcon />
		</Button>
	</div>
</div>

<div class="flex w-full flex-col items-center justify-between gap-2 leading-7">
	<p class="w-full">
		I am a student based in Singagpore, aspring to become a software developer. I am passionate
		about building creative and interactive web applications. Outside of programming, I enjoy making
		3D experiences and photography.
	</p>
</div>
