<template>
  <my-modal
    :id="id"
    :modalTitleText="modalTitleText"
  >
    <template v-slot:modal-body>
      <slot></slot>
    </template>
    <template v-slot:modal-footer>
      <my-button
        :rounded="true"
        data-mdb-dismiss="modal"
        @click="$emit('edit')"
      >Edit</my-button>
    </template>
  </my-modal>
</template>

<script>
import MyModal from '@/components/global-components/MyModal'

export default {
  name: 'my-edit-form-modal',
  components: { MyModal },
  props: {
    id: {
      type: String,
      required: true
    },
    modalTitleText: {
      type: String,
      required: true
    },
  },
  emits: ['edit']
}
</script>