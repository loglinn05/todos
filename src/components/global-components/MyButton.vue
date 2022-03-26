<template>
  <button
    type="button"
    :class="'btn ' + [outline ? `btn-outline-${colorClass} ` : `btn-${colorClass} `] + [rounded ? 'btn-rounded ' : ''] + arrayToClassString(anotherClasses)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
  props: {
    anotherClasses: {
      type: Array,
      default() {
        return [];
      }
    },
    colorClass: {
      type: String,
      default: 'secondary'
    },
    outline: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    arrayToClassString(array) {
      let string = '';
      for (let key in array) {
        string += array[key] + ' ';
      }
      return string.trim();
    }
  }
}
</script>

<style>
.btn {
  font-size: 1.5em !important;
}

@media screen and (max-width: 992px) {
  .btn {
    font-size: 1.25em !important;
  }
}
</style>