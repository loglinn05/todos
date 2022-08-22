<template>
  <div class="container-fluid px-lg-5 px-md-4 px-sm-5 px-3 py-5">
    <div class="row d-flex flex-row align-items-start">
      <todos-page
        v-if="!isPhone"
        @markTodoListAsActive="markAsActive"
        @setRemovedTodoListId="setRemovedTodoListId"
        @setEditedTodoListData="setEditedTodoListData"
        @setRemovedTodoId="setRemovedTodoId"
        @setEditedTodoData="setEditedTodoData"
        @markTodoAsDone="markAsDone"
        @markTodoAsUndone="markAsUndone"
      />
      <mobile-todos-page
        v-else
        @markTodoListAsActive="markAsActive"
        @setRemovedTodoListId="setRemovedTodoListId"
        @setEditedTodoListData="setEditedTodoListData"
        @setRemovedTodoId="setRemovedTodoId"
        @setEditedTodoData="setEditedTodoData"
        @markTodoAsDone="markAsDone"
        @markTodoAsUndone="markAsUndone"
      />
      <my-confirmation-modal
        :id="'todoRemovalConfirmation'"
        :modal-title-text="'Are you sure?'"
        :modal-body-text="'Do you really want to delete your to-do?'"
        @confirm="removeTodo"
      />
      <my-confirmation-modal
        :id="'todoListRemovalConfirmation'"
        :modal-title-text="'Are you sure?'"
        :modal-body-text="'Do you really want to delete your to-do list?'"
        @confirm="removeTodoList"
      />
      <todo-addition-form-modal
        :id="todosState.todoAdditionFormModalId"
        @addTodo="addTodo"
      />
      <todo-edit-form-modal
        :id="todosState.todoEditFormModalId"
        @editTodo="editTodo"
      />
      <todo-list-creation-form-modal
        :id="todoListsState.todoListCreationFormModalId"
        @createTodoList="createTodoList"
      />
      <todo-list-name-change-form-modal
        :id="todoListsState.todoListNameChangeFormModalId"
        @changeTodoListName="editTodoList"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { onMounted, ref, provide } from 'vue'
import todos from '@/modules/todos.js'
import todoLists from '@/modules/todoLists.js'
import TodosPage from '@/components/TodosPage'
import MobileTodosPage from '@/components/MobileTodosPage'
import TodoAdditionFormModal from '@/components/TodoAdditionFormModal'
import TodoEditFormModal from '@/components/TodoEditFormModal'
import TodoListCreationFormModal from '@/components/TodoListCreationFormModal'
import TodoListNameChangeFormModal from '@/components/TodoListNameChangeFormModal'

export default {
  components: {
    TodosPage,
    MobileTodosPage,
    TodoAdditionFormModal,
    TodoEditFormModal,
    TodoListCreationFormModal,
    TodoListNameChangeFormModal
  },
  setup() {
    const {
      todosState,
      addTodo,
      markAsDone,
      markAsUndone,
      setEditedTodoData,
      editTodo,
      setRemovedTodoId,
      removeTodo,
      getTodos
    } = todos();
    const {
      todoListsState,
      getTodoLists,
      removeTodoList,
      createTodoList,
      markAsActive,
      setRemovedTodoListId,
      setEditedTodoListData,
      editTodoList
    } = todoLists();

    const isPhone = ref(window.screen.width < 768);

    onMounted(() => {
      getTodoLists();
      getTodos();
    })

    provide('todosState', todosState);
    provide('todoListsState', todoListsState);

    return {
      todosState,
      addTodo,
      markAsDone,
      markAsUndone,
      setEditedTodoData,
      editTodo,
      setRemovedTodoId,
      removeTodo,
      todoListsState,
      removeTodoList,
      createTodoList,
      markAsActive,
      setRemovedTodoListId,
      setEditedTodoListData,
      editTodoList,
      isPhone,
    }
  },
};
</script>

<style>
.list-item, .to-do-addition-form-wrapper, .empty-list {
  max-width: 50em;
  border-radius: 0.5rem;
}
.list-item:not(.list-item.done, .list-item.active), .to-do-addition-form-wrapper, .empty-list {
  background: white;
}
.list-item.active {
  background: rgba(218, 112, 214, 0.75);
}
.list-item.done {
  background: palegreen;
}
.list-item.done h2 {
  text-decoration: line-through;
}
.list-item-buttons {
  margin-left: 1em;
}
.list-item-buttons button {
  background: transparent;
  border: none;
  outline: none;
}
.list-loading-spinner {
  width: 3.8em;
  height: 3.8em;
}
</style>