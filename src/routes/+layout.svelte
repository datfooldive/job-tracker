<script lang="ts">
	import '../app.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/geist';
	import '@fontsource/source-serif-4';
	import '@fontsource/merriweather';
	import '@fontsource/geist-mono';
	let { children } = $props();
</script>

{@render children()}

<style>
	:global(body) {
		font-family: var(--font-sans);
	}
</style>
