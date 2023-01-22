<template>
  <section>
    <span
      ref='resize-div-tr'
      class="triangle top-right"
      :class="getClass()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup="handleMouseUp($event)"
      @mousemove="handleMouseMove($event)"
    >
    </span>
    <span
      ref='resize-div-br'
      class="triangle bottom-right"
      :class="getClass()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup="handleMouseUp($event)"
      @mousemove="handleMouseMove($event)"
    >
    </span>
    <span
      ref='resize-div-tl'
      class="triangle top-left"
      :class="getClass()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup="handleMouseUp($event)"
      @mousemove="handleMouseMove($event)"
    >
    </span>
    <span
      ref='resize-div-bl'
      class="triangle bottom-left"
      :class="getClass()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup="handleMouseUp($event)"
      @mousemove="handleMouseMove($event)"
    >
    </span>
  </section>
</template>

<script lang="ts">
import type { ClientCoordinates } from '@/classes/clientCoordinates/clientCoordinates';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'resize',

  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    }
  },

  emits: ['resizeStarted', 'resizeStopped', 'onResize'],

  data() {
    return {
      isSizing: false,
      parentPadding: 0,
    }
  },

  methods: {

    getClass(): string {
      return this.isActive ? 'active ' : 'in-active ';
    },
    
    handleMouseUp(event: MouseEvent) {
      event.stopPropagation;
      this.isSizing = false;
      window.removeEventListener('mouseup', this.handleMouseUp);
      this.$emit('resizeStopped');
    },
    
    handleDown(ev: MouseEvent) {
      if (!this.isActive) return;
      if (!this.isSizing) {
        this.resizeStarted(ev);
      }
    },
    
    resizeStarted(ev: MouseEvent) {
      this.isSizing = true;
      window.addEventListener("mousemove", this.handleMouseMove);
      window.addEventListener("mouseup", this.handleMouseUp);
      this.$emit('resizeStarted', ev);
    },
    
    emitResize(clientCoordinates: ClientCoordinates) {
      this.$emit('onResize', clientCoordinates);
    },
    
    handleMouseMove(ev: MouseEvent) {
      ev.stopPropagation;
      if (this.isSizing) {
        const clientCoordinates: ClientCoordinates = {
          clientX: ev.pageX,
          clientY: ev.pageY,
          offsetWidth: (this.$el as HTMLDivElement).offsetWidth,
          offsetHeight: (this.$el as HTMLDivElement).offsetHeight
        };
        this.emitResize(clientCoordinates);
      }
    },

    
  },
})
</script>
  
<style lang="css" scoped>
.triangle {
  position: absolute;
  box-sizing: border-box;
  z-index: 1;
  filter: invert(1);
  mix-blend-mode: difference;
  background-image: url('../../../assets/icons/triangle-top-left-24.png');
  @apply h-6 w-6;
}

.bottom-right {
  right: -1px;
  bottom: -6px;
  cursor: nwse-resize;
  transform: rotate(180deg);
}

.top-right {
  right: -1px;
  top: -6px;
  cursor: nesw-resize;
  transform: rotate(90deg);
}

.bottom-left {
  left: -1px;
  bottom: -6px;
  cursor: nesw-resize;
  transform: rotate(270deg);
}

.top-left {
  left: -1px;
  top: -6px;
  cursor: nwse-resize;
}

.active {
  visibility: visible;
}

.in-active {
  visibility: hidden;
}
</style>
