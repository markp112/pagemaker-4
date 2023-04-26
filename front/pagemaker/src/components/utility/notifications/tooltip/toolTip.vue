<template>
  <div class="tooltip-container" ref="tooltipContainer">
    <span class="tooltip-trigger" @mouseenter="setTooltipPosition($event)">
    <slot></slot>
  </span>
    <div class="tooltip tooltip-box"
      v-if="show"
      :style="{ top: tooltipTop , left: tooltipLeft }"
      ref="tooltip"
    >{{ tooltip }}
  </div>
  </div>
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
      tooltipLeft: '0px',
      tooltipTop: '0px',
    }
  },

  computed: {
    show(): boolean {
      if (this.$props.tooltip) {
        return this.$props.showToolTip ;
      }
      return false;
    },
  },

  methods: {

    setTooltipPosition(event: MouseEvent) {
      const tooltipElement = <HTMLElement>(this.$refs.tooltip);
      if(!tooltipElement) {
        return;
      }
      const tooltipWidth = tooltipElement.offsetWidth;
      const tooltipHeight = tooltipElement.offsetHeight;
      const containerElement = this.$refs.tooltipContainer as HTMLElement;
      const containerRect = containerElement.getBoundingClientRect();
      const availableSpace = {
        top: containerRect.top,
        right: window.innerWidth - containerRect.right,
        bottom: window.innerHeight - containerRect.bottom,
        left: containerRect.left
      };
      if (availableSpace.bottom >= tooltipHeight) {
        this.tooltipTop = containerRect.bottom - containerRect.top + 'px';
      } else if (availableSpace.top >= tooltipHeight) {
        this.tooltipTop = (containerRect.top - tooltipHeight) + 'px';
      } else {
        this.tooltipTop = (window.innerHeight - tooltipHeight) + 'px';
      }

      if (availableSpace.right <= tooltipWidth) {
        this.tooltipLeft = containerRect.right - containerRect.left - (tooltipWidth / 2) + 'px';
      } else if (containerRect.left <= tooltipWidth) {
        console.log('here')
        this.tooltipLeft = (containerRect.right + (tooltipWidth)) + 'px';
      } else {
        this.tooltipLeft = '0';
      }
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

.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-box {
  @apply absolute text-xs z-20 bg-site-surface;
  @apply border-t-4 border-site-secondary-light;
  @apply rounded-md py-2 shadow-lg w-32 text-center text-on-surface;
}

.tooltip {
  padding: 8px;
  z-index: 100;
  transition: opacity 0.3s ease-in-out;
  top: 0;
  left: 0;
  transform: translate(-100%, -100%)
}

.tooltip-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}






</style>
