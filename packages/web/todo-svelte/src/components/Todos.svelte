<script>
  import FilterButton from "./FilterButton.svelte";
  import MoreActions from "./MoreActions.svelte";
  import NewTodo from "./NewTodo.svelte";
  import Todo from "./Todo.svelte";
  import TodosStatus from "./TodosStatus.svelte";

  import { alert } from "../store";

  export let todos = [];

  $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  let todosStatus; // reference to TodosStatus instance

  let filter = "all";

  $: {
    if (filter === "all") {
      $alert = "모든 todo 목록을 보여줍니다.";
    } else if (filter === "active") {
      $alert = "해야 할 todo 목록을 보여줍니다.";
    } else if (filter === "completed") {
      $alert = "완료된 todo 목록을 보여줍니다.";
    }
  }

  const filterTodos = (filter, todos) =>
    filter === "active"
      ? todos.filter((t) => !t.completed)
      : filter === "completed"
      ? todos.filter((t) => t.completed)
      : todos;

  function addTodo(name) {
    todos = [...todos, { id: newTodoId, name, completed: false }];
    $alert = `'${name}' 할일이 추가되었습니다. `;

    // todos.push({ id: 999, name: newTodoName, completed: false });
    // todos = todos;
  }

  function removeTodo(todo) {
    todos = todos.filter((t) => t.id !== todo.id);
    todosStatus.focus(); // give focus to status heading
    $alert = `'${todo.name}' 할일이 삭제되었습니다. `;
  }

  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id);

    if (todos[i].name !== todo.name)
      $alert = `'${todos[i].name}' 할일이 '${todo.name}'으로 변경되었습니다. `;

    if (todos[i].completed !== todo.completed)
      $alert = `'${todos[i].name}' 할일이 ${
        todo.completed ? "완료" : "활성"
      } 상태가 되었습니다.`;

    todos[i] = { ...todos[i], ...todo };
  }

  const checkAllTodos = (completed) => {
    /**
     * 감시방법 1
     */
    // todos.forEach((t) => (t.completed = completed));
    // console.log("todos", todos);
    // todos = todos;

    /**
     * 감시방법 2
     */
    // todos.forEach((t, i) => (todos[i].completed = completed));

    /**
     * 감시방법 3
     */
    todos = todos.map((t) => ({ ...t, completed }));
    $alert = `${completed ? "Checked" : "Unchecked"} ${todos.length} to-dos`;
  };

  const removeCompletedTodos = () => {
    $alert = `Removed ${todos.filter((t) => t.completed).length} to-dos`;
    todos = todos.filter((t) => !t.completed);
    todosStatus.focus();
  };
</script>

<div class="todoapp stack-large">
  <!-- NewTodo -->
  <NewTodo autofocus on:addTodo={(e) => addTodo(e.detail)} />

  <!-- Filter -->
  <FilterButton bind:filter />

  <!-- TodosStatus -->
  <TodosStatus bind:this={todosStatus} {todos} />

  <!-- Todos -->
  <!-- To-dos -->
  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
    {#each filterTodos(filter, todos) as todo (todo.id)}
      <li class="todo">
        <Todo
          {todo}
          on:update={(e) => updateTodo(e.detail)}
          on:remove={(e) => removeTodo(e.detail)}
        />
      </li>
    {:else}
      <li>아직 아무것도 없습니다.</li>
    {/each}
  </ul>

  <hr />

  <!-- MoreActions -->
  <MoreActions
    {todos}
    on:checkAll={(e) => checkAllTodos(e.detail)}
    on:removeCompleted={removeCompletedTodos}
  />
</div>
