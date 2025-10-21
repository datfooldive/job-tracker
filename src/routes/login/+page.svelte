<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { authClient } from '$lib/client';
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Welcome!</Card.Title>
		<Card.Description>Sign in with your GitHub account to continue.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Button
			onclick={async () => {
				await authClient.signIn.social({
					provider: 'github'
				});
			}}
		>
			Login with Github
		</Button>
	</Card.Content>
</Card.Root>
