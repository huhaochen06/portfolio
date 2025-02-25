<script>
	import { page } from '$app/state';

	let {
		title = page.data.title ?? '',
		description = page.data.description ?? '',
		keywords = page.data.keywords ?? '',
		canonical = page.data.canonical ?? '',
		siteName = page.data.siteName ?? '',
		imageURL = page.data.imageURL ?? '',
		logo = page.data.logo ?? '',
		author = page.data.author ?? '',
		name = page.data.name ?? '',
		type = page.data.type ?? 'website',
		index = page.data.index ?? true,
		twitter = page.data.twitter ?? true,
		openGraph = page.data.openGraph ?? true,
		schemaOrg = page.data.schemaOrg ?? false,
		schemaType = page.data.schemaType ?? ['Person', 'Organization'],
		socials = page.data.socials ?? [],
		jsonld = page.data.jsonld ?? {}
	} = $props();

	// Derived values that update when page.data changes
	let pageTitle = $derived(page.data.title ?? title);
	let pageDescription = $derived(page.data.description ?? description);
	let pageKeywords = $derived(page.data.keywords ?? keywords);
	let pageCanonical = $derived(page.data.canonical ?? canonical);
	let pageSiteName = $derived(page.data.siteName ?? siteName);
	let pageImageURL = $derived(page.data.imageURL ?? imageURL);
	let pageLogo = $derived(page.data.logo ?? logo);
	let pageAuthor = $derived(page.data.author ?? author);
	let pageName = $derived(page.data.name ?? name);
	let pageType = $derived(page.data.type ?? type);
	let pageIndex = $derived(page.data.index ?? index);
	let pageTwitter = $derived(page.data.twitter ?? twitter);
	let pageOpenGraph = $derived(page.data.openGraph ?? openGraph);
	let pageSchemaOrg = $derived(page.data.schemaOrg ?? schemaOrg);
	let pageSchemaType = $derived(page.data.schemaType ?? schemaType);
	let pageSocials = $derived(page.data.socials ?? socials);
	let pageJsonld = $derived(page.data.jsonld ?? jsonld);

	let Ld = $derived({
		'@context': 'https://schema.org',
		'@type': pageSchemaType.length > 1 ? pageSchemaType : pageSchemaType[0],
		name: pageName,
		url: page.url.origin,
		image: pageImageURL,
		logo: {
			'@type': 'ImageObject',
			url: pageLogo,
			width: 48,
			height: 48
		},
		sameAs: pageSocials,
		...pageJsonld
	});

	let LdScript = $derived(`<script type="application/ld+json">${JSON.stringify(Ld)}<\/script>`);
</script>

<svelte:head>
	{#if pageTitle !== ''}
		{#if pageImageURL}
			<meta
				name="robots"
				content={pageIndex ? 'index, follow, max-image-preview:large' : 'noindex'}
			/>
		{:else}
			<meta name="robots" content={pageIndex ? 'index, follow' : 'noindex'} />
		{/if}
		<title>{pageTitle}</title>
		<link rel="canonical" href={pageCanonical ? pageCanonical : page.url.href} />
	{/if}
	{#if pageDescription !== ''}
		<meta name="description" content={pageDescription} />
	{/if}
	{#if pageKeywords !== ''}
		<meta name="keywords" content={pageKeywords} />
	{/if}
	{#if pageAuthor !== ''}
		<meta name="author" content={pageAuthor} />
	{/if}
	{#if pageOpenGraph}
		{#if pageSiteName !== ''}
			<meta property="og:site_name" content={pageSiteName} />
		{/if}
		{#if pageTitle !== ''}
			<meta property="og:url" content={page.url.href} />
			<meta property="og:type" content={pageType} />
			<meta property="og:title" content={pageTitle} />
		{/if}
		{#if pageDescription !== ''}
			<meta property="og:description" content={pageDescription} />
		{/if}
		{#if pageImageURL !== ''}
			<meta property="og:image" content={pageImageURL} />
		{/if}
		{#if pageLogo !== ''}
			<meta property="og:logo" content={pageLogo} />
		{/if}
	{/if}
	{#if pageTwitter}
		{#if pageTitle !== ''}
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="twitter:domain" content={page.url.hostname} />
			<meta property="twitter:url" content={page.url.href} />
			<meta name="twitter:title" content={pageTitle} />
		{/if}
		{#if pageDescription !== ''}
			<meta name="twitter:description" content={pageDescription} />
		{/if}
		{#if pageImageURL !== ''}
			<meta name="twitter:image" content={pageImageURL} />
		{/if}
	{/if}
	{#if pageSchemaOrg && (pageSocials[0] !== undefined || pageLogo !== '' || pageName !== '')}
		{@html LdScript}
	{/if}
</svelte:head>
