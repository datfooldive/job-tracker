<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Content>
		<SiteHeader user={data.user} session={data.session} />
		<div class="flex flex-1 flex-col gap-4 px-4 py-10">
			{@render children?.()}
		</div>
	</Sidebar.Content>
</Sidebar.Provider>
