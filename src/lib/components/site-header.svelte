<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { IconLogout, IconMoon, IconSun } from '@tabler/icons-svelte';
	import { authClient } from '$lib/client';
	import { goto } from '$app/navigation';
	import { toggleMode } from 'mode-watcher';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/state';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	const { session, user } = $derived(page.data);

	const sidebar = Sidebar.useSidebar();

	const pathnames = $derived(page.url.pathname.split('/').filter(Boolean));

	const breadcrumbs = $derived(
		pathnames
			.filter((segment) => isNaN(Number(segment)))
			.map((segment, i, filtered) => ({
				name: segment.charAt(0).toUpperCase() + segment.slice(1),
				href: '/' + filtered.slice(0, i + 1).join('/'),
				isLast: i === filtered.length - 1
			}))
	);
</script>

<header
	class="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear"
>
	<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
		<Sidebar.Trigger class="-ml-1" />
		<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				{#if breadcrumbs.length > 0}
					<Breadcrumb.Separator />
					{#each breadcrumbs as { name, href, isLast }, i}
						<Breadcrumb.Item>
							{#if isLast}
								<Breadcrumb.Page>{name}</Breadcrumb.Page>
							{:else}
								<Breadcrumb.Link {href}>{name}</Breadcrumb.Link>
							{/if}
						</Breadcrumb.Item>
						{#if !isLast}
							<Breadcrumb.Separator />
						{/if}
					{/each}
				{/if}
			</Breadcrumb.List>
		</Breadcrumb.Root>
		<div class="ml-auto flex items-center gap-2">
			<Button onclick={toggleMode} variant="ghost" size="icon">
				<IconSun
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
				/>
				<IconMoon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
			{#if session}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<Avatar.Image src={user?.image} alt={user?.name} />
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						class="min-w-56 rounded-lg"
						side={sidebar.isMobile ? 'bottom' : 'right'}
						align={sidebar.isMobile ? 'end' : 'start'}
						sideOffset={8}
					>
						<DropdownMenu.Label class="px-2 py-0 font-normal">
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">{user?.name}</span>
								<span class="font-xs truncate text-muted-foreground">{user?.email}</span>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item
							onclick={async () => {
								await authClient.signOut({
									fetchOptions: {
										onSuccess: async () => {
											await goto('/login');
										}
									}
								});
							}}
						>
							<IconLogout />
							Log out
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	</div>
</header>
