<template>
  <div
    class="to-do-addition-form-wrapper d-inline-flex w-100 flex-column align-items-center p-sm-5 p-4 mb-md-0 mb-5"
  >
    <my-input
      :label="'Your To-Do'"
      :placeholder="'Enter Your To-Do'"
      v-model.trim="todoText"
      @keydown.enter="addTodo"
    />
    <my-button
      :anotherClasses="['mt-3', 'd-flex', 'align-items-center']"
      :rounded="true"
      @click="addTodo"
    >
      Add To-Do
      <fade-transition>
        <span
          v-if="todoAdditionInProcess"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </fade-transition>
    </my-button>
  </div>
</template>

<script>
export default {
  name: 'todo-addition-form',
  props: {
     todoAdditionInProcess: {
       type: Boolean,
       required: true
     }
  },
  data() {
    return {
      todoText: ''
    }
  },
  methods: {
    addTodo() {
      this.$emit('addTodo', this.todoText);
      this.todoText = '';
    }
  },
  emits: ['addTodo']
}
</script>

<style scoped>
button .spinner-border-sm {
  margin-left: 1rem;
  border-width: 2px;
}
</style>