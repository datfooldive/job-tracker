import type { Snippet } from 'svelte';
import type { ColumnDef, Table } from '@tanstack/table-core';

export type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	toolbar?: Snippet<[{ table: Table<TData> }]>;
	addSection?: Snippet<[]>;
	bulkAction?: Snippet<[{ table: Table<TData> }]>;
};
