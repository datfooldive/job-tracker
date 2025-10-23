import { writable } from 'svelte/store';

export const selectedId = writable<number | null>(null);
export const openDialog = writable(false);
export const openBulkDialog = writable(false);
