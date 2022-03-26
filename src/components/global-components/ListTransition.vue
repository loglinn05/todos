<template>
  <transition-group name="list" @beforeLeave="beforeLeave">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: 'list-transition',
  methods: {
    beforeLeave(el) {
      const {marginLeft, marginTop, width, height} = window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`;
      el.style.width = width;
      el.style.height = height;
    }
  }
}
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.list-leave-active {
  position: absolute;
}
</style>