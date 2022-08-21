<template>
  <div class="d-inline-flex justify-content-center px-1">
    <button
      class="big-icon-button text-secondary bg-transparent border-0 p-0"
      title="Add to-do list"
      data-mdb-toggle="modal"
      :data-mdb-target="'#' + todoListsState.todoListCreationFormModalId"
      @click="modalInputFocus(todoListsState.todoListCreationFormModalId)"
    ><i class="fas fa-plus"></i></button>
  </div>
  <list-transition>
    <div
      v-for="todoList in todoListsState.todoLists"
      :todoList="todoList"
      :key="todoList.id"
      :class="'list-item '  + [todoList.active ? 'active ' : ''] + 'd-inline-flex justify-content-between p-2 my-1'"
    >
      <div
        class="w-100 d-inline-flex flex-column text-break"
        :title="[todoList.active ? '' : 'Choose to-do list']"
        @click="onClickMarkAsActive(todoList)"
      >
        <h2>{{ todoList.name }}</h2>
        <p><small>
          {{ (new Date(todoList.created_at)).toLocaleDateString() }}
          {{ (new Date(todoList.created_at)).toLocaleTimeString() }}
        </small></p>
      </div>
      <div class="list-item-buttons d-inline-flex my-auto">
        <button
          class="text-danger"
          title="Remove to-do list"
          data-mdb-toggle="modal"
          data-mdb-target="#todoListRemovalConfirmation"
          @click="$emit('setRemovedTodoListId', todoList.id)"
        ><i class="fas fa-times"></i></button>
        <button
          id="to-do-list-edit-button"
          class="text-secondary"
          title="Change to-do list name"
          data-mdb-toggle="modal"
          :data-mdb-target="'#' + todoListsState.todoListNameChangeFormModalId"
          @click="onEditButtonClick(todoList.id, todoList.name)"
        ><i class="fas fa-pen-alt"></i></button>
      </div>
    </div>
    <div
      class="empty-list p-5 d-inline-flex justify-content-center text-center"
      v-if="(todoListsState.todoLists.length === 0)"
    >
      <fade-transition mode="out-in">
        <h2 v-if="!todoListsState.todoListsAreLoading">You Have No To-Do Lists</h2>
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
  name: 'todo-lists-list',
  inject: ['todoListsState'],
  data () {
    return {
      todoListNameChangeModalFormInput: function () {
        return {};
      }
    }
  },
  mounted() {
    this.todoListNameChangeModalFormInput = document.querySelector('#' + this.todoListsState.todoListNameChangeFormModalId + ' input');
  },
  methods: {
    onEditButtonClick(todoListId, todoListName) {
      this.todoListNameChangeModalFormInput.value = '';
      setTimeout(() => {
        this.todoListNameChangeModalFormInput.focus();
        setTimeout(() => {
          this.todoListNameChangeModalFormInput.value = todoListName;
        }, 500);
      }, 750);
      this.$emit('setEditedTodoListData', todoListId, todoListName);
    },
    onClickMarkAsActive(todoList) {
      if(!todoList.active) {
        this.$emit('markAsActive', todoList.id);
      }
    }
  },
  setup() {
    const { modalInputFocus } = modal();

    return {
      modalInputFocus
    };
  },
  emits: ['markAsActive', 'setRemovedTodoListId', 'setEditedTodoListData'],
}
</script>