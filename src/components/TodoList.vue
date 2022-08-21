<template>
  <div
    v-if="todosState.activeTodoListId"
    class="d-inline-flex justify-content-center px-1"
  >
    <button
      class="big-icon-button text-secondary bg-transparent border-0 p-0"
      title="Add to-do"
      data-mdb-toggle="modal"
      :data-mdb-target="'#' + todosState.todoAdditionFormModalId"
      @click="modalInputFocus(todosState.todoAdditionFormModalId)"
    ><i class="fas fa-plus"></i></button>
  </div>
  <list-transition>
    <div
      v-for="todo in todosState.todos"
      :todo="todo"
      :key="todo.id"
      :class="'list-item ' + [todo.done ? 'done' : '']"
      class="d-inline-flex justify-content-between p-2 my-1"
    >
      <div class="d-inline-flex flex-column text-break">
        <h2>{{ todo.text }}</h2>
        <p><small>
          {{ (new Date(todo.created_at)).toLocaleDateString() }}
          {{ (new Date(todo.created_at)).toLocaleTimeString() }}
        </small></p>
      </div>
      <div class="list-item-buttons d-inline-flex my-auto">
        <button
          class="text-danger"
          title="Remove to-do"
          data-mdb-toggle="modal"
          data-mdb-target="#todoRemovalConfirmation"
          @click="$emit('setRemovedTodoId', todo.id)"
        ><i class="fas fa-times"></i></button>
        <fade-transition>
          <button
            v-if="!todo.done"
            class="text-success"
            title="Mark as done"
            @click="$emit('markAsDone', todo.id)"
          ><i class="fas fa-check"></i></button>
          <button
            v-else
            class="text-warning"
            title="Mark as undone"
            @click="$emit('markAsUndone', todo.id)"
          ><i class="fas fa-undo"></i></button>
        </fade-transition>
        <button
          id="to-do-edit-button"
          class="text-secondary"
          title="Edit to-do"
          data-mdb-toggle="modal"
          :data-mdb-target="'#' + todosState.todoEditFormModalId"
          @click="onEditButtonClick(todo.id, todo.text)"
        ><i class="fas fa-pen-alt"></i></button>
      </div>
    </div>
    <div
      class="empty-list p-5 d-inline-flex justify-content-center text-center"
      v-if="(todosState.todos.length === 0)"
    >
      <fade-transition mode="out-in">
        <template v-if="!todosState.todosAreLoading">
          <h2 v-if="todosState.activeTodoListId">To-Do List Is Empty</h2>
          <h2 v-else>Choose a to-do list</h2>
        </template>
        <div v-else class="list-loading-spinner spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </fade-transition>
    </div>
  </list-transition>
</template>

<script>
import modal from '@/modules/modal.js'

export default {
  name: "todo-list",
  inject: ['todosState'],
  data () {
    return {
      todos: [],
      todoEditModalFormInput: function () {
        return {};
      }
    }
  },
  methods: {
    onEditButtonClick(todoId, todoText) {
      this.todoEditModalFormInput.value = '';
      setTimeout(() => {
        this.todoEditModalFormInput.focus();
        setTimeout(() => {
          this.todoEditModalFormInput.value = todoText;
        }, 500);
      }, 750);
      this.$emit('setEditedTodoData', todoId, todoText);
    }
  },
  mounted() {
    this.todoEditModalFormInput = document.querySelector('#' + this.todosState.todoEditFormModalId + ' input');
  },
  setup() {
    const { modalInputFocus } = modal();

    return {
      modalInputFocus
    };
  },
  emits: ['setRemovedTodoId', 'setEditedTodoData', 'markAsDone', 'markAsUndone']
}
</script>