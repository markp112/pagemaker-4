<template>
  <section>
    <span
      ref='resize-div-tr'
      class="handle top-right"
      :class="getClass()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup="handleMouseUp($event)"
      @mousemove="handleMouseMove($event)"
    >
    </span>
    <span
      ref='resize-div-br'
      class="handle bottom-right"
      :class="getClass()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup="handleMouseUp($event)"
      @mousemove="handleMouseMove($event)"
    >
    </span>
    <span
      ref='resize-div-tl'
      class="handle top-left"
      :class="getClass()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup.stop="handleMouseUp($event)"
      @mousemove.stop="handleMouseMove($event)"
    >
    </span>
    <span
      ref='resize-div-bl'
      class="handle bottom-left"
      :class="getClass()"
      @mousedown.stop.prevent="handleDown($event)"
      @mouseup.stop="handleMouseUp($event)"
      @mousemove.stop="handleMouseMove($event)"
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
  
<style lang="css">

.grab-container {
  position: relative;
}

.box {
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
}

.handle {
  position: absolute;
  width: 20px;  width: 20px;
  height: 20px;
  border-radius: 50%; /* Change to make it circular */
  background-color: #000;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.handle::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%; /* Change to make it circular */
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.handle:hover {
  transform: scale(1.2);
}

.top-left {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}

.top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}

.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}

.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
}

.active {
  visibility: visible;
}

.in-active {
  visibility: hidden;
}
</style>
