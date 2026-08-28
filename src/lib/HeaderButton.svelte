<script>
  import { Images } from '@lucide/svelte';
  import { Button, SpinLoader } from 'rimecms/panel';
  import { toast } from 'svelte-sonner';
  import { END_POINT } from './constants';

  let { config } = $props();
  let processing = $state(false);

  const regenerate = async () => {
    processing = true;
    const res = await fetch(`${END_POINT}?slug=${config.slug}`, {
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

{#if config.upload}
  <Button variant="text" icon={processing ? SpinLoader : Images} onclick={regenerate}>
    Regenerate sizes
  </Button>
{/if}
