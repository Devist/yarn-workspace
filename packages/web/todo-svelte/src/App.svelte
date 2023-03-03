<script>
  export let name;

  function toggleName() {
    if (name === "world") {
      name = "svelte";
    } else {
      name = "world";
    }
  }
</script>

<main>
  <h1>안녕! {name}!</h1>
  <button on:click={toggleName}>토글 name</button>
  <p>
    <a href="https://svelte.dev/tutorial">Svelte 튜토리얼</a>에 방문해서 Svelte
    앱을 반드는 방법을 배워보세요.
  </p>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
