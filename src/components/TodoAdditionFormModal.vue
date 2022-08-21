<template>
  <my-modal
    :id="id"
    :modalTitleText="'Add To-Do'"
  >
    <template v-slot:modal-body>
      <my-input
        class="mx-3"
        label="Your To-Do"
        placeholder="Your To-Do Text"
        v-model.trim="todoText"
        @keydown.enter="addTodo"
      />
    </template>
    <template v-slot:modal-footer>
      <my-button
        :rounded="true"
        data-mdb-dismiss="modal"
        @click="addTodo"
      >Add To-Do</my-button>
    </template>
  </my-modal>
</template>

<script>

export default {
  name: 'todo-addition-form-modal',
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
    addTodo() {
      this.$emit('addTodo', this.todoText);
      this.todoText = '';
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
  emits: ['addTodo']
}
</script>