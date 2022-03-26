<template>
  <my-edit-form-modal
    :id="id"
    :modalTitleText="'Edit To-Do'"
    @edit="editTodo"
  >
    <my-input
      class="mx-3"
      :label="'Your To-Do'"
      :placeholder="'Edit Your To-Do'"
      v-model.trim="todoText"
      @keydown.enter="editTodo"
    />
  </my-edit-form-modal>
</template>

<script>
export default {
  name: 'todo-edit-form-modal',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      todoText: '',
      input: function () {
        return {};
      }
    }
  },
  methods: {
    editTodo() {
      this.$emit('editTodo', this.todoText);
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
  emits: ['editTodo']
}
</script>