<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import { columns } from './columns';
	import Button from '$lib/components/ui/button/button.svelte';
	import { IconPlus } from '@tabler/icons-svelte';
	import { toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/state';
	import type { PageProps } from './$types';
	import type { ApplicationWithRelations } from '$lib/server/db/schema';
	import type { Table } from '@tanstack/table-core';
	import DataTableBulkActions from './data-table-bulk-actions.svelte';

	let { data }: PageProps = $props();

	const flash = getFlash(page);

	$effect(() => {
		if ($flash?.message && $flash.type === 'success') {
			toast.success($flash.message);
		}
	});
</script>

{#snippet addSection()}
	<Button size="sm" href="/application/create">
		<IconPlus />
		<span class="hidden lg:inline">Add Application</span>
	</Button>
{/snippet}

{#snippet bulkAction(props: { table: Table<ApplicationWithRelations> })}
	{@const { table } = props}
	<DataTableBulkActions {table} />
{/snippet}
<DataTable {columns} data={data.applications} {addSection} {bulkAction}></DataTable>
