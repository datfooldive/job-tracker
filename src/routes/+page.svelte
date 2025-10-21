<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/client';
	const session = authClient.useSession();
</script>

{#if $session.data}
	<div>
		<p>
			{$session.data.user.name}
		</p>
		<button
			onclick={async () => {
				await authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							goto('/login');
						}
					}
				});
			}}
		>
			Sign Out
		</button>
	</div>
{/if}
