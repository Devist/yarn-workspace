<script>
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  export let autofocus = false;

  let name = "";
  let nameEl; // reference to the name input DOM node

  const addTodo = () => {
    dispatch("addTodo", name);
    name = "";
    nameEl.focus();
  };

  const onCancel = () => {
    name = "";
    nameEl.focus();
  };

  console.log("초기화 중", nameEl);
  onMount(() => {
    console.log("mounted:", nameEl);
    autofocus && nameEl.focus();
  });
</script>

<form
  on:submit|preventDefault={addTodo}
  on:keydown={(e) => e.key === "Escape" && onCancel()}
>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg">해야할 일은 무엇입니까?</label>
  </h2>
  <input
    bind:value={name}
    bind:this={nameEl}
    type="text"
    id="todo-0"
    autoComplete="off"
    class="input input__lg"
  />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg">
    추가하기
  </button>
</form>
