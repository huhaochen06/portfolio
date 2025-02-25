

And that will render just like so:

```css
.my-css-class {
	color: #ffd100;
	box-sizing: border-box;
	/* etc... */
}
```

Here's how you'd do JavaScript:

```
\```ts
// You can use ts or javascript for the language
\```
```

Highlighted code sample:
```ts
const invertNumberInRange = (num, range) => {
	return range - num;
}

invertNumberInRange(25, 100); // 75
```

Of course, mdsvex supports Svelte highlighting, too:

```svelte
<script>
	import myComponent from '$lib/components/myComponent.svelte';

	export let myProp = undefined;
</script>

<div>
	<MyComponent prop={myProp}>
</div>
```

All these colors are in `src/lib/assets/css/prism.css`, if you'd like to change them.