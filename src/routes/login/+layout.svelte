<script lang="ts">
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex h-screen items-center justify-center">
	{@render children()}
</div>
