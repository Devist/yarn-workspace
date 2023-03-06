<script>
  export let todos;

  $: totalTodos = todos.length;
  $: completedTodos = todos.filter((todo) => todo.completed).length;

  let headingEl;

  // 포커스 함수만 readonly로 내보냄으로써, 포커스에 대한 처리를 해당 컴포넌트 내에서 가능하도록 함.
  export function focus() {
    // shorter version: export const focus = () => headingEl.focus()
    headingEl.focus();
  }
</script>

<h2 id="list-heading" bind:this={headingEl} tabindex="-1">
  {completedTodos} / {totalTodos} 완료
</h2>
