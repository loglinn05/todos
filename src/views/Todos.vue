<template>
  <div class="container-fluid to-do-list px-lg-5 px-md-4 px-sm-5 px-3 py-5">
    <div class="row d-flex flex-md-row flex-column-reverse align-items-start">
      <div class="col d-flex position-relative flex-column align-items-stretch">
        <todo-list
          :todos="state.todos"
          :todosAreLoading="state.todosAreLoading"
          @setRemovedTodoId="setRemovedTodoId"
          @setEditedTodoData="setEditedTodoData"
          @markAsDone="markAsDone"
          @markAsUndone="markAsUndone"
        />
      </div>
      <div class="col d-flex flex-column align-items-center">
        <todo-addition-form
          :todoAdditionInProcess="state.todoAdditionInProcess"
          @addTodo="addTodo"
        />
      </div>
      <my-confirmation-modal
        :id="'todoRemovalConfirmation'"
        :modal-title-text="'Are you sure?'"
        :modal-body-text="'Do you really want to delete your to-do?'"
        @confirm="removeTodo"
      />
      <todo-edit-form-modal
        :id="state.todoEditFormModalId"
        @editTodo="editTodo"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import modal from '@/modules/modal.js'
import toast from '@/modules/toast.js'
import TodoList from '@/components/TodoList'
import TodoAdditionForm from '@/components/TodoAdditionForm'
import TodoEditFormModal from '@/components/TodoEditFormModal'

export default {
  components: { TodoAdditionForm, TodoList, TodoEditFormModal },
  setup() {
    const state = reactive({
      todos: [],
      removedTodoId: null,
      editedTodoId: null,
      editedTodoText: '',
      todosAreLoading: false,
      todoAdditionInProcess: false,
      baseApiUrl: process.env.VUE_APP_BASE_API_URL,
      todoEditFormModalId: 'todoEditFormModal'
    });

    const { infoToast, successToast, dangerToast } = toast();

    function addTodo(todoText) {
      if (todoText) {
        state.todoAdditionInProcess = true;
        let { close } = infoToast();
        axios.post((state.baseApiUrl + 'create'), {
          todoText: todoText
        }).then(function () {
          successToast('To-do successfully added.');
          getTodos();
        }).catch(function () {
          dangerToast('To-do addition failed.');
        }).finally(() => {
          state.todoAdditionInProcess = false;
          close();
        });
      }
    }

    function markAsDone(id) {
      let { close } = infoToast();
      axios.post((state.baseApiUrl + 'mark-as-done'), {
        todoId: id
      }).then(function () {
        getTodos();
      }).catch(function () {
        dangerToast('Failed to mark to-do as done.');
      }).finally(() => {
        close();
      });
    }

    function markAsUndone(id) {
      let { close } = infoToast();
      axios.post((state.baseApiUrl + 'mark-as-undone'), {
        todoId: id
      }).then(function () {
        getTodos();
      }).catch(function () {
        dangerToast('Failed to mark to-do as undone.');
      }).finally(() => {
        close();
      });
    }

    function setEditedTodoData(id, text) {
      state.editedTodoId = id;
      state.editedTodoText = text;
    }

    function editTodo(todoText) {
      const { hideModal } = modal();
      hideModal(state.todoEditFormModalId);
      if (todoText && todoText != state.editedTodoText) {
        axios.post((state.baseApiUrl + 'edit'), {
          todoId: state.editedTodoId,
          todoText: todoText
        }).then(function () {
          successToast('To-do successfully edited.');
          getTodos();
        }).catch(function () {
          dangerToast('Failed to edit to-do.');
        });
      }
    }

    function setRemovedTodoId(value) {
      state.removedTodoId = value;
      console.log(state.removedTodoId);
    }

    function removeTodo() {
      let { close } = infoToast();
      axios.post((state.baseApiUrl + 'delete'), {
        removedTodoId: state.removedTodoId
      }).then(function () {
        successToast('To-do successfully deleted.');
        getTodos();
      }).catch(function () {
        dangerToast('To-do deletion failed.');
      }).finally(() => {
        close()
      });
    }

    async function getTodos() {
      try {
        state.todosAreLoading = true;
        const response = await axios.get(state.baseApiUrl);
        state.todos = response.data;
      } catch (e) {
        dangerToast('To-dos loading failed.');
      } finally {
        state.todosAreLoading = false;
      }
    }

    onMounted(() => {
      getTodos();
    })

    return {
      state,
      addTodo,
      markAsDone,
      markAsUndone,
      setEditedTodoData,
      editTodo,
      setRemovedTodoId,
      removeTodo,
    }
  }
};
</script>

<style>
.to-do, .to-do-addition-form-wrapper, .no-to-dos {
  max-width: 50em;
  border-radius: 20px;
}
.to-do:not(.to-do.done), .to-do-addition-form-wrapper, .no-to-dos {
  background: white;
}
.to-do.done {
  background: palegreen;
}
.to-do.done h2 {
  text-decoration: line-through;
}
.to-do-buttons {
  margin-left: 1em;
}
.to-do-buttons button {
  background: transparent;
  border: none;
  outline: none;
}
.todos-loading-spinner {
  width: 3.8em;
  height: 3.8em;
}
</style>