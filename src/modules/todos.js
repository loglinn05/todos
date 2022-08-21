import { reactive } from 'vue'
import axios from 'axios'
import toast from '@/modules/toast.js'
import modal from '@/modules/modal.js'

const todosState = reactive({
    todos: [],
    activeTodoListId: 0,
    removedTodoId: null,
    editedTodoId: null,
    editedTodoText: '',
    todosAreLoading: false,
    baseTodosApiUrl: process.env.VUE_APP_BASE_TODOS_API_URL,
    todoAdditionFormModalId: 'todoAdditionFormModal',
    todoEditFormModalId: 'todoEditFormModal'
});

export default function () {
    const { infoToast, dangerToast } = toast();

    function addTodo(todoText) {
        const { hideModal } = modal();
        hideModal(todosState.todoAdditionFormModalId);
        if (todoText) {
            let { close } = infoToast();
            axios.post((todosState.baseTodosApiUrl + 'create'), {
                todoText: todoText
            }).then(function () {
                getTodos();
            }).catch(function () {
                dangerToast('To-do addition failed.');
            }).finally(() => {
                close();
            });
        }
    }

    function markAsDone(id) {
        let { close } = infoToast();
        axios.post((todosState.baseTodosApiUrl + 'mark-as-done'), {
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
        axios.post((todosState.baseTodosApiUrl + 'mark-as-undone'), {
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
        todosState.editedTodoId = id;
        todosState.editedTodoText = text;
    }

    function editTodo(todoText) {
        const { hideModal } = modal();
        hideModal(todosState.todoEditFormModalId);
        if (todoText && todoText != todosState.editedTodoText) {
            axios.post((todosState.baseTodosApiUrl + 'edit'), {
                todoId: todosState.editedTodoId,
                todoText: todoText
            }).then(function () {
                getTodos();
            }).catch(function () {
                dangerToast('Failed to edit to-do.');
            });
        }
    }

    function setRemovedTodoId(value) {
        todosState.removedTodoId = value;
    }

    function removeTodo() {
        let { close } = infoToast();
        axios.post((todosState.baseTodosApiUrl + 'delete'), {
            removedTodoId: todosState.removedTodoId
        }).then(function () {
            getTodos();
        }).catch(function () {
            dangerToast('To-do deletion failed.');
        }).finally(() => {
            close()
        });
    }

    async function getTodos() {
        try {
            todosState.todosAreLoading = true;
            const response = await axios.get(todosState.baseTodosApiUrl);
            todosState.activeTodoListId = response.data[0];
            todosState.todos = response.data[1];
        } catch (e) {
            dangerToast('To-dos loading failed.');
        } finally {
            todosState.todosAreLoading = false;
        }
    }

    return {
        todosState,
        addTodo,
        markAsDone,
        markAsUndone,
        setEditedTodoData,
        editTodo,
        setRemovedTodoId,
        removeTodo,
        getTodos
    }
}