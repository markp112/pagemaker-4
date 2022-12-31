<template>
  <span v-if="show"
    class="tooltip-box"
    :class="{
      'transition ease-out duration-200 opacity-0': !show,
      'transition ease-in duration-500 opacity-90': show,
    }"
    role="alert"
  >
    {{ $props.tooltip }}
  </span>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'tool-tip',

  props: {
    showToolTip: Boolean,
    tooltip: String,
  },

  computed: {
    show(): boolean {
      return this.$props.showToolTip;
    },

  }
})
</script>
<style lang="css">
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.tooltip-box {
  @apply absolute text-xs z-20 bg-site-surface;
  @apply -right-36 top-0 border-t-4 border-site-secondary-light;
  @apply rounded-md py-2 shadow-lg w-32 text-center text-on-surface;
}
</style>
