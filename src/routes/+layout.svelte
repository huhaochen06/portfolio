<script lang="ts">
	import { Navigation } from '$lib/components/navigation';
	import Seo from '$lib/components/seo.svelte';
	import { StarryBackground } from '$lib/components/starry-background';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
</script>

<Seo />
<Toaster />
<ModeWatcher />
<Navigation />
<StarryBackground starCount={256} />

{@render children?.()}
