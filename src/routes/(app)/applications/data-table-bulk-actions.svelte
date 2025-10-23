<script lang="ts">
	import type { Table, Row } from '@tanstack/table-core';
	import type { ApplicationWithRelations } from '$lib/server/db/schema';
	import Button from '$lib/components/ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import ConfirmDialog from '$lib/components/confirm-dialog.svelte';
	import { openBulkDialog } from './store';

	const { table } = $props<{ table: Table<ApplicationWithRelations> }>();

	function handleOpenMultiDeleteDialog() {
		openBulkDialog.set(true);
	}
</script>

<Button variant="destructive" size="sm" onclick={handleOpenMultiDeleteDialog}>
	Delete Selected ({table.getFilteredSelectedRowModel().rows.length})
</Button>

<ConfirmDialog
	bind:open={$openBulkDialog}
	title="Confirm Multi-Delete"
	description={`Are you sure you want to delete ${table.getFilteredSelectedRowModel().rows.length} items? This action cannot be undone.`}
>
	<form
		action="?/deleteMulti"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type === 'success' || result.type === 'failure') {
					const data = result.data as { success: boolean; message: string };
					if (data.success) {
						toast.success(data.message);
						openBulkDialog.set(false);
						table.resetRowSelection();
					} else {
						toast.error(data.message);
					}
				} else {
					toast.error('Something went wrong');
				}
				update();
			};
		}}
	>
		<input
			type="hidden"
			name="ids"
			value={table
				.getFilteredSelectedRowModel()
				.rows.map((r: Row<ApplicationWithRelations>) => r.original.id)
				.join(',')}
		/>
		<Button variant="destructive" type="submit">Delete</Button>
	</form>
</ConfirmDialog>
