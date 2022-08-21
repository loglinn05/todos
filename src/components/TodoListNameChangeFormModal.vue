<template>
  <my-edit-form-modal
    :id="id"
    :modalTitleText="'Change To-Do List Name'"
    @edit="changeTodoListName"
  >
    <my-input
      class="mx-3"
      label="Your To-Do"
      placeholder="Edit Your To-Do"
      v-model.trim="todoListName"
      @keydown.enter="changeTodoListName"
    />
  </my-edit-form-modal>
</template>
<script>
export default {
  name: 'todo-list-name-change-form-modal',
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
    changeTodoListName() {
      this.$emit('changeTodoListName', this.todoListName);
    }
  },
  mounted() {
    this.input = document.querySelector('#' + this.id + ' input');
    this.input.addEventListener('blur', () => {
      if (this.todoText && !this.input.classList.contains('active')) {
        this.input.classList.add('active');
      }
    })
  },
  emits: ['changeTodoListName']
}
</script>