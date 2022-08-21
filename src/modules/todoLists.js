import { reactive } from 'vue'
import axios from 'axios'
import toast from '@/modules/toast.js'
import modal from '@/modules/modal.js'
import todos from '@/modules/todos.js'

const todoListsState = reactive({
    todoLists: [],
    todoListsAreLoading: false,
    removedTodoListId: null,
    editedTodoListId: null,
    editedTodoListName: '',
    baseTodoListsApiUrl: process.env.VUE_APP_BASE_TODO_LISTS_API_URL,
    todoListCreationFormModalId: 'todoListCreationFormModal',
    todoListNameChangeFormModalId: 'todoListNameChangeFormModal'
});

export default function () {
    const { infoToast, dangerToast } = toast();
    const { todosState, getTodos } = todos();

    async function getTodoLists() {
        try {
            todoListsState.todoListsAreLoading = true;
            const response = await axios.get(todoListsState.baseTodoListsApiUrl);
            todoListsState.todoLists = response.data;
        } catch (e) {
            dangerToast('To-do lists loading failed.');
        } finally {
            todoListsState.todoListsAreLoading = false;
        }
    }

    function createTodoList(todoListName) {
        const { hideModal } = modal();
        hideModal(todoListsState.todoListCreationFormModalId);
        if (todoListName) {
            let { close } = infoToast();
            axios.post((todoListsState.baseTodoListsApiUrl + 'create'), {
                todoListName: todoListName
            }).then(function () {
                getTodoLists();
            }).catch(function () {
                dangerToast('To-do list addition failed.');
            }).finally(() => {
                close();
            });
        }
    }

    function markAsActive(value) {
        let { close } = infoToast();
        if (value) {
            axios.post((todoListsState.baseTodoListsApiUrl + 'mark-as-active'), {
                activatedTodoListId: value
            }).then(function () {
                getTodoLists();
                getTodos();
            }).catch(function () {
                dangerToast('Failed to mark to-do list as active.');
            }).finally(() => {
                close();
            });
        }
    }

    function setRemovedTodoListId(value) {
        todoListsState.removedTodoListId = value;
    }

    function removeTodoList() {
        let { close } = infoToast();
        axios.post((todoListsState.baseTodoListsApiUrl + 'delete'), {
            removedTodoListId: todoListsState.removedTodoListId
        }).then(function () {
            getTodoLists();
            if (todosState.activeTodoListId == todoListsState.removedTodoListId) {
                todosState.activeTodoListId = 0;
                getTodos();
            }
        }).catch(function () {
            dangerToast('To-do list deletion failed.');
        }).finally(() => {
            close()
        });
    }

    function setEditedTodoListData(id, name) {
        todoListsState.editedTodoListId = id;
        todoListsState.editedTodoListName = name;
    }

    function editTodoList(todoListName) {
        const { hideModal } = modal();
        hideModal(todoListsState.todoListNameChangeFormModalId);
        if (todoListName && todoListName != todoListsState.editedTodoListName) {
            axios.post((todoListsState.baseTodoListsApiUrl + 'edit'), {
                todoListId: todoListsState.editedTodoListId,
                todoListName: todoListName
            }).then(function () {
                getTodoLists();
            }).catch(function () {
                dangerToast('Failed to change to-do list name.');
            });
        }
    }

    return {
        todoListsState,
        getTodoLists,
        removeTodoList,
        createTodoList,
        markAsActive,
        setRemovedTodoListId,
        setEditedTodoListData,
        editTodoList
    }
}