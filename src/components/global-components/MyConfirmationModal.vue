<template>
  <my-modal
    :id="id"
    :modalTitleText="modalTitleText"
  >
    <template v-slot:modal-body>
      <p>{{ modalBodyText }}</p>
    </template>
    <template v-slot:modal-footer>
      <my-button data-mdb-dismiss="modal">Nope</my-button>
      <my-button
        :colorClass="'danger'"
        data-mdb-dismiss="modal"
        @click="$emit('confirm')"
      >Yes</my-button>
    </template>
  </my-modal>
</template>

<script>
import MyModal from '@/components/global-components/MyModal'

export default {
  name: 'my-confirmation-modal',
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
    modalBodyText: {
      type: String,
      required: true
    }
  },
  emits: ['confirm']
}
</script>