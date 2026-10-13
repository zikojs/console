<script>
  import { Console } from "@zikojs/svelte-console";

  const data = (async () => {
    const resp = await fetch("https://api.github.com/orgs/zikojs");
    return await resp.json();
  })();
</script>

<!-- Promises -->
 <!-- Way 1 : -->
<Console.log items = {data} />

 <!-- Way 2 : -->
{#await data}
  <Console.warn items = {'Loading ...'} />
{:then items}
  <Console.log {items} />
{:catch error}
  <Console.error items = {`Error: ${error.message}`} />
{/await}