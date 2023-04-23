<template>
  <span v-if="show"
    class="tooltip-box"
    :class="tooltipPosition"
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

  data() {
    return {
      tooltipPosition: '',
    }
  },

  computed: {
    show(): boolean {
      return this.$props.showToolTip && this.tooltip !=='';
    },
  },

  methods: {
    showTooltip(event: MouseEvent) {
      if (!event.target) {
        return;
      }
      const eventTarget = event.target as HTMLElement;
      const tooltip = eventTarget.previousElementSibling as HTMLDivElement;
      const spaceAbove = eventTarget.offsetTop - tooltip.offsetHeight;
      const spaceBelow = window.innerHeight - eventTarget.offsetTop - eventTarget.offsetHeight - tooltip.offsetHeight;
      const spaceLeft = eventTarget.offsetLeft - tooltip.offsetWidth;
      const spaceRight = window.innerWidth - eventTarget.offsetLeft - eventTarget.offsetWidth - tooltip.offsetWidth;
      
      this.tooltipPosition = '';
      
      if (spaceAbove > 0) {
        this.tooltipPosition = 'top';
    } else if (spaceBelow > 0) {
      this.tooltipPosition = 'bottom';
    }

    if ((spaceLeft > 0 && this.tooltipPosition === 'bottom') || (spaceRight < 0 && this.tooltipPosition === 'top')) {
      this.tooltipPosition += ' left';
    } else if ((spaceRight > 0 && this.tooltipPosition === 'bottom') || (spaceLeft < 0 && this.tooltipPosition === 'top')) {
      this.tooltipPosition += ' right';
    }

    tooltip.style.display = 'block';
  },
    hideTooltip(event: MouseEvent) {
      const tooltip = (event.target as HTMLElement).previousElementSibling;
      // tooltip.style.display = 'none';
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

.tooltip-container {
  position: relative;
}

.tooltip {
  display: none;
  position: absolute;
  padding: 5px;
  background-color: #000;
  color: #fff;
}

.tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.tooltip.left {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
}

.tooltip.right {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
}

.btn {
  margin-top: 100px;
}

</style>
