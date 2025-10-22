<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Row } from '@tanstack/table-core';
	import type { Status } from '$lib/server/db/schema';
	import Button from '$lib/components/ui/button/button.svelte';
	import { IconEdit, IconDotsVertical, IconTrash } from '@tabler/icons-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { openDialog, selectedId } from './store';
	import { toast } from 'svelte-sonner';
	import ConfirmDialog from '$lib/components/confirm-dialog.svelte';

	const { row } = $props<{ row: Row<Status> }>();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex size-8 text-muted-foreground data-[state=open]:bg-muted">
		{#snippet child({ props })}
			<Button variant="ghost" size="icon" {...props}>
				<IconDotsVertical />
				<span class="sr-only">Open menu</span>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item class="flex w-full justify-start">
			{#snippet child({ props })}
				<Button variant="ghost" size="icon" {...props} href={`/status/edit/${row.original.id}`}>
					<IconEdit />
					Edit
				</Button>
			{/snippet}
		</DropdownMenu.Item>
		<DropdownMenu.Item
			class="flex w-full justify-start"
			variant="destructive"
			onclick={() => {
				selectedId.set(row.original.id);
				openDialog.set(true);
			}}
		>
			{#snippet child({ props })}
				<Button variant="ghost" {...props}>
					<IconTrash />
					Delete
				</Button>
			{/snippet}
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

{#if $selectedId === row.original.id}
	<ConfirmDialog
		bind:open={$openDialog}
		title="Confirm Delete"
		description="Are you sure you want to delete this status? This action cannot be undone."
	>
		<form
			action="?/delete"
			method="post"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success' || result.type === 'failure') {
						const data = result.data as { success: boolean; message: string };
						if (data.success) {
							toast.success(data.message);
							openDialog.set(false);
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
			<input type="hidden" name="id" value={$selectedId} />
			<Button variant="destructive" type="submit">Delete</Button>
		</form>
	</ConfirmDialog>
{/if}
