<template>
  <list-transition>
    <div
      v-for="todo in todos"
      :todo="todo"
      :key="todo.id"
      :class="'to-do ' + [todo.done ? 'done' : '']"
      class="d-inline-flex justify-content-between p-2 my-1"
    >
      <div class="d-inline-flex flex-column text-break">
        <h2>{{ todo.text }}</h2>
        <p><small>
          {{ (new Date(todo.created_at)).toLocaleDateString() }}
          {{ (new Date(todo.created_at)).toLocaleTimeString() }}
        </small></p>
      </div>
      <div class="to-do-buttons d-inline-flex my-auto">
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
          :data-mdb-target="todoEditButtonTarget"
          @click="onEditButtonClick(todo.id, todo.text)"
        ><i class="fas fa-pen-alt"></i></button>
      </div>
    </div>
    <div
      class="no-to-dos p-5 d-inline-flex justify-content-center text-center"
      v-if="(todos.length === 0)"
    >
      <fade-transition mode="out-in">
        <h2 v-if="!todosAreLoading">Your To-Do List Is Empty.</h2>
        <div v-else class="todos-loading-spinner spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </fade-transition>
    </div>
  </list-transition>
</template>

<script>
export default {
  name: "todo-list",
  props: {
    todos: {
      type: Array,
      required: true
    },
    todosAreLoading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      todoEditButtonTarget: '#todoEditFormModal',
      todoEditModalFormInput: function () {
        return {};
      }
    }
  },
  methods: {
    type(input, text, i = 0) {
      if (i < text.length) {
        input.value += text.charAt(i);
        i++;
        setTimeout(this.type, 50, input, text, i);
      }
    },
    onEditButtonClick(todoId, todoText) {
      this.todoEditModalFormInput.value = '';
      setTimeout(() => {
        this.todoEditModalFormInput.focus();
        setTimeout(() => {
          this.type(this.todoEditModalFormInput, todoText);
        }, 500);
      }, 750);
      this.$emit('setEditedTodoData', todoId, todoText);
    }
  },
  mounted() {
    this.todoEditModalFormInput = document.querySelector(this.todoEditButtonTarget + ' input');
  },
  emits: ['setRemovedTodoId', 'setEditedTodoData', 'markAsDone', 'markAsUndone']
}
</script>