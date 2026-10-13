<script>
  import { ZikoWrapper } from "@zikojs/svelte";
  import { Console as _Console } from "@zikojs/console/no-css";

  const props = $props();

  let {
    items = [],
    methode = "log"
  } = props;

  let resolvedItems = $state([]);
  let error = $state(null);

  $effect(() => {
    let cancelled = false;

    error = null;

    Promise.resolve(items).then(
      (value) => {
        if (!cancelled) resolvedItems = value;
      },
      (err) => {
        if (!cancelled) error = err;
      }
    );

    return () => {
      cancelled = true;
    };
  });

  const ZikoConsole = ({ methode = "log", items = [] } = {}) =>
    _Console[methode](items);
</script>

{#if error}
  <p>Failed to load console items: {error.message}</p>
{:else}
  <ZikoWrapper
    items={ZikoConsole({ methode, items: resolvedItems })}
  />
{/if}

<style>
  @import "@zikojs/console/style";
</style>