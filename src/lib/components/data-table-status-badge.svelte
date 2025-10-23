<script lang="ts">
	import { Badge } from '$lib/components/ui/badge//index.js';
	import type { Status } from '$lib/server/db/schema';

	export let status: Status | null;
</script>

{#if status}
	<Badge variant="secondary">{status.name}</Badge>
{:else}
	<span class="text-muted-foreground">-</span>
{/if}
