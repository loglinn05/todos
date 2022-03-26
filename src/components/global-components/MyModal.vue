<template>
  <div class="modal fade" :id="id" tabindex="-1" :aria-labelledby="id + 'Label'" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-center" :id="id + 'Label'">{{ modalTitleText }}</h2>
          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="modal-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-modal',
  props: {
    id: {
      type: String,
      required: true
    },
    modalTitleText: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.modal-dialog .modal-content {
  background: mistyrose;
}
</style>