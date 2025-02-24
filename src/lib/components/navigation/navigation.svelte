<script lang="ts">
	import { BlurEffect } from '../blur-effect';
	import MainNav from './main-nav.svelte';
	import ThemeControl from './theme-control.svelte';
</script>

<nav
	class="fixed bottom-8 left-1/2 z-50 flex h-fit w-auto max-w-screen-lg -translate-x-1/2 flex-nowrap items-center justify-center gap-2 transition-all duration-500 md:gap-4 lg:top-8"
>
	<MainNav />
	<ThemeControl />
	<BlurEffect />
</nav>
