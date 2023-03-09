<script>
  import Todos from "./components/Todos.svelte";
  import Alert from "./components/Alert.svelte";

  import { todos } from "./store";
</script>

<Alert />
<Todos bind:todos={$todos} />
