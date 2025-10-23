<script lang="ts">
	import type { PageProps } from './$types';
	import DataTable from '$lib/components/data-table.svelte';
	import { columns } from './columns';
	import Button from '$lib/components/ui/button/button.svelte';
	import { IconPlus } from '@tabler/icons-svelte';
	import type { Table } from '@tanstack/table-core';
	import type { Status } from '$lib/server/db/schema';
	import DataTableBulkActions from './data-table-bulk-actions.svelte';
	import { toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/state';

	let { data }: PageProps = $props();

	const flash = getFlash(page);

	$effect(() => {
		if ($flash?.message && $flash.type === 'success') {
			toast.success($flash.message);
		}
	});
</script>

{#snippet addSection()}
	<Button size="sm" href="/status/create">
		<IconPlus />
		<span class="hidden lg:inline">Add Status</span>
	</Button>
{/snippet}

{#snippet bulkAction(props: { table: Table<Status> })}
	{@const { table } = props}
	<DataTableBulkActions {table} />
{/snippet}
<DataTable {columns} data={data.status} {addSection} {bulkAction}></DataTable>
