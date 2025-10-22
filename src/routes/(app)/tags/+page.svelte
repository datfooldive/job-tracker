<script lang="ts">
	import type { PageProps } from './$types';
	import DataTable from '$lib/components/data-table.svelte';
	import { columns } from './columns';
	import Button from '$lib/components/ui/button/button.svelte';
	import { IconPlus } from '@tabler/icons-svelte';
	import type { Table } from '@tanstack/table-core';
	import type { Tag } from '$lib/server/db/schema';
	import DataTableBulkActions from './data-table-bulk-actions.svelte';

	let { data }: PageProps = $props();
</script>

{#snippet addSection()}
	<Button size="sm">
		<IconPlus />
		<span class="hidden lg:inline">Add Tag</span>
	</Button>
{/snippet}

{#snippet bulkAction(props: { table: Table<Tag> })}
	{@const { table } = props}
	<DataTableBulkActions {table} />
{/snippet}
<DataTable {columns} data={data.tags} {addSection} {bulkAction}></DataTable>
