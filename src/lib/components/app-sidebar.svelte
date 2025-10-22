<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import {
		IconBriefcase,
		IconBriefcase2,
		IconDashboard,
		IconListDetails,
		IconTag
	} from '@tabler/icons-svelte';
	import type { ComponentProps } from 'svelte';
	import { page } from '$app/stores';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref class="border-r-0" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem class="flex items-center gap-2 p-[0.48rem]">
				<IconBriefcase2 class="size-6!" />
				<span class="text-base font-semibold">Job Tracker</span>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent class="flex flex-col gap-2">
				<Sidebar.Menu>
					<Sidebar.MenuButton isActive={$page.url.pathname === '/'}>
						{#snippet child({ props })}
							<a href="/" {...props}>
								<IconDashboard class="size-5!" />
								<span>Dashboard</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.Menu>
				<Sidebar.Menu>
					<Sidebar.MenuButton isActive={$page.url.pathname === '/applications'}>
						{#snippet child({ props })}
							<a href="/applications" {...props}>
								<IconBriefcase class="size-5!" />
								<span>Applications</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.Menu>
				<Sidebar.Menu>
					<Sidebar.MenuButton isActive={$page.url.pathname === '/status'}>
						{#snippet child({ props })}
							<a href="/status" {...props}>
								<IconListDetails class="size-5!" />
								<span>Status</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.Menu>
				<Sidebar.Menu>
					<Sidebar.MenuButton isActive={$page.url.pathname === '/tags'}>
						{#snippet child({ props })}
							<a href="/tags" {...props}>
								<IconTag class="size-5!" />
								<span>Tags</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
