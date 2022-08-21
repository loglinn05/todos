<template>
  <fade-transition>
    <div
      v-if="todoListsOrTodos"
      class="col d-flex position-relative flex-column align-items-stretch"
    >
      <div class="d-inline-flex justify-content-end px-1">
        <button
          class="big-icon-button text-secondary bg-transparent border-0 p-0"
          @click="toggleDivs(false)"
        ><i class="fas fa-chevron-circle-right"></i></button>
      </div>
      <todo-lists-list
        @markAsActive="$emit('markTodoListAsActive', $event)"
        @setRemovedTodoListId="$emit('setRemovedTodoListId', $event)"
        @setEditedTodoListData="$emit('setEditedTodoListData', $event)"
      />
    </div>
    <div
      v-else
      class="col d-flex position-relative flex-column align-items-stretch"
    >
      <div class="d-inline-flex justify-content-start px-1">
        <button
          class="big-icon-button text-secondary bg-transparent border-0 p-0"
          @click="toggleDivs(true)"
        ><i class="fas fa-chevron-circle-left"></i></button>
      </div>
      <todo-list
        @setRemovedTodoId="$emit('setRemovedTodoId', $event)"
        @setEditedTodoData="$emit('setEditedTodoData', $event)"
        @markAsDone="$emit('markTodoAsDone', $event)"
        @markAsUndone="$emit('markTodoAsUndone', $event)"
      />
    </div>
  </fade-transition>
</template>

<script>
import TodoListsList from '@/components/TodoListsList'
import TodoList from '@/components/TodoList'

export default {
  name: "mobile-todos-page",
  components: {
    TodoListsList,
    TodoList
  },
  data() {
    return {
      todoListsOrTodos: true
    }
  },
  methods: {
    toggleDivs(value) {
      this.todoListsOrTodos = value;
    }
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