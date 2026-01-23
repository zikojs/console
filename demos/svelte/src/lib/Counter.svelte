<script>
  let {start} = $props();
  let count = $state(start)
  const increment = () => {
    count += 1
  }
</script>

<button onclick={increment}>
  count is {count}
</button>
