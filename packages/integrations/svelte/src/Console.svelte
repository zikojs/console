
<script>
import { ZikoWrapper } from "@zikojs/svelte";
import { Console as _Console } from "@zikojs/console/no-css";

export let items = '';
export let methode = "log";

const ZikoConsole = ({ methode = "log", items = [] } = {}) =>
    _Console[methode](items);
</script>

<ZikoWrapper
  items={ZikoConsole({ methode, items })}
/>

<style>
  @import "@zikojs/console/style";
</style>