<template>
  <div
    :ref="getId()"
    :id="getId()"
    class="relative select-none overflow-hidden"
    @click.stop="onImageClick()"
    :style="getContainerStyles()"
  >
    <img
      ref="image-element"
      class="absolute"
      :src="getImage()"
      :style="getStyles()"
    />
    <Resize :is-active="isActive" 
      @resize-started="resizeStarted($event)"
      @on-resize="onResize($event)"
    />
  </div>
</template>

<script lang="ts">
import type { ClientCoordinates } from '@/classes/clientCoordinates/clientCoordinates';
import { defineComponent } from 'vue';
import { useMouse } from '../classes/mouse/mouse';
import type { PageElement, PropsDefinition } from '../model/pageElement/pageElement';
import { Resize } from '../../base/resize/onResize';
import resize from '@/components/base/resize/resize.vue';
import { stylesToString } from '../functions/stylesToString';
import type { ImageElement } from '../model/imageElement/imageElement';
import { getImageUrl } from '@/common/getIcon';
export default  defineComponent({
  name: 'imageComponent',

  emits: ['onClick'],

  components: {
    Resize: resize,
  },

  data() {
    return {
      thisComponent: {} as PageElement,
      isActive: false,
      mouse: new useMouse(),
      isSizing: false,
    }
  },

  mounted() {
    this.thisComponent = (this.$attrs.props as unknown as PropsDefinition).thisComponent;
  },

  methods: {

    resizeStarted(event: MouseEvent ) {
      this.mouse.updatePositionEvent(event)
    },
      
    onResize(aDimension: ClientCoordinates) {
      Resize(this.thisComponent as PageElement, this.mouse as useMouse).onResize(aDimension);
    },

    onImageClick() {
      this.isActive = true;
      this.$emit('onClick', this.thisComponent);
    },

    getDimensions(): string {
      let dimension = '' 
      if(this.thisComponent.dimension) {
        dimension = this.thisComponent.dimension.toStyle();
      }
      return dimension;
    },

    getImage(): string {
      const path =  getImageUrl((this.thisComponent as ImageElement).content);
      return path;
    },

    getId() {
      return this.thisComponent.ref;
    },

    getClasses(): string {
      return this.thisComponent.classDefinition;
    },

    getStyles(): string {
      let styles = '';
      if(this.thisComponent.styles) {
        styles = stylesToString(this.thisComponent.styles)
      }
      styles += this.getDimensions();
      return styles;
    },
    
    getContainerStyles(): string {
      if((this.thisComponent as ImageElement).container) {
        return (this.thisComponent as ImageElement).container.naturalSize.toStyle();
      }
      return '';
    }

  },

})
</script>
