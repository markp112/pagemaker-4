<template>
  <div class="overflow-hidden flex-nowrap relative" 
    :id="getId()"
    :ref="getId()"
    :class="getClasses()"
    :style="getStyles()"
    @click.prevent="onClick()"
  >
    hello world {{ getClasses() }}{{ getStyles() }}
    <Resize :is-active="isActive" 
      @resize-started="resizeStarted($event)"
      @on-resize="onResize($event)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { stylesToString } from '../functions/stylesToString';
import type { PageElement, PropsDefinition } from '../model/pageElement/pageElement';
import resize from '@/components/base/resize/resize.vue';
import { useMouse } from '../functions/mouse';
import type { ClientCoordinates } from '@/classes/clientCoordinates/clientCoordinates';
import { ADimension, type Dimension } from '@/classes/dimension';

  export default defineComponent({
    name: 'component-container',

    components: {
      Resize: resize,
    },

    data() {
      return {
        thisComponent: {} as PageElement,
        isActive: true,
        mouse: new useMouse(),
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
      },

      resizeStarted(event: MouseEvent ) {
        this.mouse.updatePositionEvent(event)
      },

      
    onResize(ADimension: ClientCoordinates) {
      console.log('%c⧭', 'color: #f279ca', ADimension)
      // if (this.isDragging) return;
      const thisComponent = this.thisComponent;
      const boundingRect: ADimension | null = this.getElementDimension(
        thisComponent.ref
        );
        console.log('%c⧭', 'color: #7f7700', boundingRect)
      if (boundingRect) {
        this.mouse.updatePositionCoordinates({x: ADimension.clientX, y: ADimension.clientY });
        const boxDimensions: Dimension = this.calculateNewDimensions(
          boundingRect,
          this.mouse.deltaY,
          this.mouse.deltaX,
          );
        // if (thisComponent.isContainer) {
        //   const parentContainer = thisComponent.parent;
        //   const parentDimensions = parentContainer.dimension;
        //   const offSetWidth = ADimension.offsetWidth;
        //   if (
        //     boxDimensions.width.value + (offSetWidth * 2) >
        //       parentDimensions.width.value
        //   ) {
        //     boxDimensions.width.value =
        //       parentDimensions.width.value - ((offSetWidth * 2) + offSetWidth);
        //   }
        // }
        this.resizeComponent(boxDimensions);
      }

    },
    resizeComponent(boxDimensions: Dimension){
      this.thisComponent.dimension.height = boxDimensions.height;
      this.thisComponent.dimension.width = boxDimensions.width;
    },

  
  calculateNewDimensions(
    boundingRect: ADimension,
    changeY: number,
    changeX: number
    ): Dimension {
    return {
      height: { value: boundingRect.height.value + changeY, unit: 'px' },
      width: { value: boundingRect.width.value + changeX, unit: 'px' },
    };
  },

  getElementDimension(htmlElement: string): ADimension {
    let element = this.$refs[htmlElement] as HTMLDivElement;
    if (!element) {
      element = document.getElementById(htmlElement) as HTMLDivElement;
    }
    const boundingRect = new ADimension();
    boundingRect.width.value = element.getBoundingClientRect().width;
    boundingRect.height.value = element.getBoundingClientRect().height;
    return boundingRect;
  },

      

      onClick() {
        this.isActive = true;
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
