<script lang="ts">
	import { authClient } from '$lib/client';
</script>

<div>
	<button
		onclick={async () => {
			await authClient.signIn.social({
				provider: 'github'
			});
		}}
	>
		Continue with GitHub
	</button>
</div>
