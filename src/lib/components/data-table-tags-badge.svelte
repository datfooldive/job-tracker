<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import type { Tag } from '$lib/server/db/schema';

	export let tags: Array<{ tag: Tag }>;
</script>

<div class="flex flex-wrap gap-1">
	{#if tags.length > 0}
		{#each tags as { tag }}
			<Badge variant="outline">{tag.name}</Badge>
		{/each}
	{:else}
		<span class="text-muted-foreground">-</span>
	{/if}
</div>
