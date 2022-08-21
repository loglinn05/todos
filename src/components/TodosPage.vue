<template>
  <div
    class="col d-flex position-relative flex-column align-items-stretch"
  >
    <todo-lists-list
      @markAsActive="$emit('markTodoListAsActive', $event)"
      @setRemovedTodoListId="$emit('setRemovedTodoListId', $event)"
      @setEditedTodoListData="$emit('setEditedTodoListData', $event)"
    />
  </div>
  <div
    class="col d-flex position-relative flex-column align-items-stretch"
  >
    <todo-list
      @setRemovedTodoId="$emit('setRemovedTodoId', $event)"
      @setEditedTodoData="$emit('setEditedTodoData', $event)"
      @markAsDone="$emit('markTodoAsDone', $event)"
      @markAsUndone="$emit('markTodoAsUndone', $event)"
    />
  </div>
</template>

<script>
import TodoListsList from '@/components/TodoListsList'
import TodoList from '@/components/TodoList'

export default {
  name: "todos-page",
  components: {
    TodoListsList,
    TodoList
  },
  emits: [
    'markTodoListAsActive',
    'setRemovedTodoListId',
    'setEditedTodoListData',
    'setRemovedTodoId',
    'setEditedTodoData',
    'markTodoAsDone',
    'markTodoAsUndone'
  ]
}
</script>