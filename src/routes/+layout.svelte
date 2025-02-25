<script lang="ts">
	import { dev } from '$app/environment';
	import { Navigation } from '$lib/components/navigation';
	import Seo from '$lib/components/seo.svelte';
	import { StarryBackground } from '$lib/components/starry-background';
	import { Toaster } from '$lib/components/ui/sonner';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { ModeWatcher } from 'mode-watcher';

	import '../app.css';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	let { children } = $props();
</script>

<Seo />
<Toaster />
<ModeWatcher />
<Navigation />
<StarryBackground starCount={256} />

{@render children?.()}
