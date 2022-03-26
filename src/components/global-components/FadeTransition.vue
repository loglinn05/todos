<template>
  <transition name="fade" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'fade-transition'
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0%;
}
</style>