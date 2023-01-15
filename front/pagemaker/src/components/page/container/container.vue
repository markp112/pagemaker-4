<template>
  <div class="overflow-hidden flex-nowrap relative" 
    :id="getId()"
    :ref="getId()"
    :class="getClasses()"
    :style="getStyles()"
  >
    hello world {{ getClasses() }}{{ getStyles() }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { stylesToString } from '../functions/stylesToString';
import type { PageElement, PropsDefinition } from '../model/pageElement/pageElement';


  export default defineComponent({
    name: 'component-container',

    data() {
      return {
        thisComponent: {} as PageElement,
      }
    },

    mounted() {
      this.thisComponent = (this.$attrs.props as unknown as PropsDefinition).thisComponent;
    },

    methods: {

      getId() {
        return this.thisComponent.ref;
      },

      getClasses(): string {
        return this.thisComponent.classDefinition;
      },

      getStyles(): string {
        let styles = '';
        if(this.thisComponent.styles) {
          styles =stylesToString(this.thisComponent.styles)
        }
        styles += this.getDimensions();
        return styles;
      },

      getDimensions(): string {
        let dimension = '' 
        if(this.thisComponent.dimension) {
          dimension = this.thisComponent.dimension.toStyle();
        }
        return dimension;
        
      }
    }

  })
</script>
<style lang="css" scoped>
.border-outline {
  @apply border-red-600 border-8 border-dashed;
}

.handle {
  position: relative;
  box-sizing: border-box;
}
.border1 {
  @apply border-indigo-800 border border-dashed;
}

.triangle {
  content: '';
  position: absolute;
  bottom: -6px;
  right: -1px;
  box-sizing: border-box;
  cursor: nwse-resize;
  width: 0;
  height: 0;
  text-indent: -9999px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid rgb(56, 55, 56);
  transform: rotate(45deg);
}

.active {
  visibility: visible;
}

.in-active {
  visibility: hidden;
}
</style>
