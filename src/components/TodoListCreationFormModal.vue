<template>
  <my-modal
    :id="id"
    :modalTitleText="'Create Your To-Do List'"
  >
    <template v-slot:modal-body>
      <my-input
        class="mx-3"
        label="Your To-Do List"
        placeholder="Your To-Do List Name"
        v-model.trim="todoListName"
        @keydown.enter="createTodoList"
      />
    </template>
    <template v-slot:modal-footer>
      <my-button
        :rounded="true"
        data-mdb-dismiss="modal"
        @click="createTodoList"
      >Create To-Do List</my-button>
    </template>
  </my-modal>
</template>

<script>
export default {
  name: 'todo-list-creation-form-modal',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      todoListName: '',
      input: function () {
        return {};
      }
    }
  },
  methods: {
    createTodoList() {
      this.$emit('createTodoList', this.todoListName);
      this.todoListName = '';
    }
  },
  mounted() {
    this.input = document.querySelector('#' + this.id + ' input');
    this.input.addEventListener('blur', () => {
      if (this.todoListName && !this.input.classList.contains('active')) {
        this.input.classList.add('active');
      }
    })
  },
  emits: ['createTodoList']
}
</script>