import type { ApplicationWithRelations } from '$lib/server/db/schema';
import type { ColumnDef } from '@tanstack/table-core';
import DataTableCheckbox from '$lib/components/ui/data-table/data-table-checkbox.svelte';
import { renderComponent } from '$lib/components/ui/data-table';
import DatatableActions from './data-table-actions.svelte';
import { format } from 'date-fns';
import DataTableStatusBadge from '$lib/components/data-table-status-badge.svelte';
import DataTableTagsBadge from '$lib/components/data-table-tags-badge.svelte';

export const columns: ColumnDef<ApplicationWithRelations>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			renderComponent(DataTableCheckbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
			}),
		cell: ({ row }) =>
			renderComponent(DataTableCheckbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value)
			}),
		size: 50,
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'title',
		header: 'Title',
		size: 200,
		enableSorting: true,
		enableHiding: true
	},
	{
		accessorKey: 'company',
		header: 'Company',
		size: 150,
		enableSorting: true,
		enableHiding: true
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => renderComponent(DataTableStatusBadge, { status: row.original.status }),
		size: 120,
		enableSorting: true,
		enableHiding: true
	},
	{
		accessorKey: 'tags',
		header: 'Tags',
		cell: ({ row }) => renderComponent(DataTableTagsBadge, { tags: row.original.applicationTags }),
		size: 150,
		enableSorting: false,
		enableHiding: true
	},
	{
		accessorKey: 'appliedAt',
		header: 'Applied At',
		cell: ({ row }) => format(row.original.appliedAt, 'MMMM dd, yyyy'),
		size: 120
	},
	{
		accessorKey: 'action',
		cell: ({ row }) => renderComponent(DatatableActions, { row }),
		size: 50,
		enableSorting: false,
		enableHiding: false
	}
];
