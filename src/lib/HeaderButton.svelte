<script>
	import { Images } from '@lucide/svelte';
	import { Button, SpinLoader } from 'rimecms/panel/ui';
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';

	const collection = getContext('rime.collectionList');

	let processing = $state(false);

	const regenerate = async () => {
		processing = true;
		const res = await fetch(`/api/regenerate_images?slug=${collection.config.slug}`, {
			method: 'post'
		});
		if (res.ok) {
			const body = await res.json();
			toast.success(body.message);
			processing = false;
		} else {
			toast.error('An error occured generating sizes');
			processing = false;
		}
	};
</script>

{#if collection.config.upload}
	<Button variant="text" icon={processing ? SpinLoader : Images} onclick={regenerate}>
		Regenerate sizes
	</Button>
{/if}
