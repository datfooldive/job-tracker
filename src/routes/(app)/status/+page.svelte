<script lang="ts">
	import type { PageProps } from '../status/$types';
	import DataTable from '$lib/components/data-table.svelte';
	import { columns } from './columns';
	import Button from '$lib/components/ui/button/button.svelte';
	import { IconPlus } from '@tabler/icons-svelte';
	import type { Table } from '@tanstack/table-core';
	import type { Status } from '$lib/server/db/schema';
	import { renderComponent } from '$lib/components/ui/data-table';
	import DataTableBulkActions from './data-table-bulk-actions.svelte';

	let { data }: PageProps = $props();
</script>

{#snippet addSection()}
	<Button variant="outline" size="sm">
		<IconPlus />
		<span class="hidden lg:inline">Add Status</span>
	</Button>
{/snippet}

{#snippet bulkAction(props: { table: Table<Status> })}
	{@const { table } = props}
	<DataTableBulkActions {table} />
{/snippet}
<DataTable {columns} data={data.status} {addSection} {bulkAction}></DataTable>
