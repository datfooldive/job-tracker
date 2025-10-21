<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { IconBriefcase, IconBriefcase2, IconDashboard } from '@tabler/icons-svelte';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref class="border-r-0" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem class="flex items-center gap-2 p-[0.48rem]">
				<IconBriefcase2 class='size-6!' />
				<span class="text-base font-semibold">Job Tracker</span>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent class="flex flex-col gap-2">
				<Sidebar.Menu>
					<Sidebar.MenuButton>
						<IconDashboard class='size-5!' />
						<span>Dashboard</span>
					</Sidebar.MenuButton>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
