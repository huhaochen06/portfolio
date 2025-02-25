<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="-mt-4 flex w-full items-center justify-between">
	<div class="flex gap-2">
		<Button
			variant="link"
			target="_blank"
			class="pl-0 font-normal"
			href="https://github.com/huhaochen06"
		>
			GitHub
		</Button>
		<Button variant="link" target="_blank" class="font-normal" href="mailto:me@haochen.dev">
			Email
		</Button>

		<Button
			variant="link"
			target="_blank"
			class="font-normal"
			href="https://www.linkedin.com/in/hu-haochen/"
		>
			LinkedIn
		</Button>
	</div>
	<span class="text-sm text-muted-foreground">Built with ❤️ using SvelteKit</span>
</div>
