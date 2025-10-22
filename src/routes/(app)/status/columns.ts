import type { Status } from '$lib/server/db/schema';
import type { ColumnDef } from '@tanstack/table-core';
import DataTableCheckbox from '$lib/components/ui/data-table/data-table-checkbox.svelte';
import { renderComponent } from '$lib/components/ui/data-table';
import DatatableActions from './data-table-actions.svelte';

export const columns: ColumnDef<Status>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			renderComponent(DataTableCheckbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				'aria-label': 'Select all'
			}),
		cell: ({ row }) =>
			renderComponent(DataTableCheckbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				'aria-label': 'Select row'
			}),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableSorting: true,
		enableHiding: true
	},
	{
		accessorKey: 'action',
		cell: ({ row }) => renderComponent(DatatableActions, { row }),
		enableSorting: false,
		enableHiding: false
	}
];
