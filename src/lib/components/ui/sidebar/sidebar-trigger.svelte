<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { IconChevronsLeft, IconChevronsRight } from '@tabler/icons-svelte';
	import type { ComponentProps } from "svelte";
	import { useSidebar } from "./context.svelte.js";
	import { fade } from 'svelte/transition';

	let {
		ref = $bindable(null),
		class: className,
		onclick,
		...restProps
	}: ComponentProps<typeof Button> & {
		onclick?: (e: MouseEvent) => void;
	} = $props();

	const sidebar = useSidebar();
</script>

<Button
	data-sidebar="trigger"
	data-slot="sidebar-trigger"
	variant="ghost"
	size="icon"
	class={cn("size-7", className)}
	type="button"
	onclick={(e) => {
		onclick?.(e);
		sidebar.toggle();
	}}
	{...restProps}
>
	<div class="relative w-full h-full flex items-center justify-center">
		<IconChevronsLeft class={cn("size-5 absolute transition-opacity duration-300", (sidebar.isMobile ? sidebar.openMobile : sidebar.open) ? "opacity-100" : "opacity-0")} />
		<IconChevronsRight class={cn("size-5 absolute transition-opacity duration-300", (sidebar.isMobile ? sidebar.openMobile : sidebar.open) ? "opacity-0" : "opacity-100")} />
	</div>
	<span class="sr-only">Toggle Sidebar</span>
</Button>
