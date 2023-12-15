<template>
  <div class="tooltip-container" ref="tooltipContainerRef">
    <span class="tooltip-trigger" @mouseenter="setTooltipPosition()">
      <slot></slot>
    </span>
    <div class="tooltip tooltip-box"
      v-if="showToolTip" 
      :style="{ top: tooltipTop , left: tooltipLeft }"
      ref="tooltipRef"
    >
      {{ tooltip }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { TooltipProps } from './constants';

  defineProps<TooltipProps>();

  const tooltipLeft = ref('0px');
  const tooltipTop = ref('0px');
  const tooltipRef = ref(null);
  const tooltipContainerRef = ref(null);

  const setTooltipPosition = () => {
    console.log('heppy')
    if (!tooltipRef.value) {
      return;
    }
    const tooltipElement = tooltipRef.value as HTMLElement;
    if (!tooltipElement) {
      return;
    }
    if (!tooltipContainerRef.value) {
        return;
      }
    const containerElement = tooltipContainerRef.value as HTMLElement;
    const tooltipWidth = tooltipElement.offsetWidth;
    const tooltipHeight = tooltipElement.offsetHeight;
    const containerRect = containerElement.getBoundingClientRect();
    const availableSpace = {
      top: containerRect.top,
      right: window.innerWidth - containerRect.right,
      bottom: window.innerHeight - containerRect.bottom,
      left: containerRect.left
    };
    if (availableSpace.bottom >= tooltipHeight) {
      tooltipTop.value = containerRect.bottom - containerRect.top + 'px';
    } else if (availableSpace.top >= tooltipHeight) {
      tooltipTop.value = (containerRect.top - tooltipHeight) + 'px';
    } else {
      tooltipTop.value = (window.innerHeight - tooltipHeight) + 'px';
    }

    if (availableSpace.right <= tooltipWidth) {
      tooltipLeft.value = containerRect.right - containerRect.left - (tooltipWidth / 2) + 'px';
    } else if (containerRect.left <= tooltipWidth) {
      tooltipLeft.value = (containerRect.right + (tooltipWidth)) + 'px';
    } else {
      tooltipLeft.value = '0px';
    }
  };
  
</script>
<style lang="css">

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
  transition: opacity 2s ease-in-out;
  top: 0;
  left: 0;
  transform: translate(-100%, -100%)
}

.tooltip-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

</style>
