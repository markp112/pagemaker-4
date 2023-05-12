s<template>
  <div class="relative select-none overflow-hidden"
    :ref="getId()"
    :id="getId()"
    :class="thisComponent.classDefinition"
    :style="getContainerStyles()" 
    @click.stop="onImageClick()"
    @dragstart.stop="onDragStart($event)"
    @drag.stop="onDrag($event)"
    @dragend.stop="onDragEnd()"
    @drop.stop
  >
    <img
      ref="image-element"
      class="absolute w-100"
      :src="getImage()"
      :style="getStyles()"
    />
    <Resize :is-active="isActive" 
      @resize-started="resizeStarted($event)"
      @on-resize="onResize($event)"
      @resize-stopped="isSizing=!isSizing"
      onclick.stop=""
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
import { dimensionToStyle, locationToStyle, stylesToString } from '../functions/stylesToString';
import type { ImageElement } from '../model/imageElement/imageElement';
import { getImageUrl } from '@/common/getIcon';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { useDrag } from '@/composables/drag/drag';

export default  defineComponent({
  name: 'imageComponent',

  emits: ['onClick'],

  components: {
    Resize: resize,
  },

  data() {
    return {
      thisComponent: {} as PageElement,
      mouse: new useMouse(),
      isSizing: false,
      editorSettings: new EditorSettingsService(),
      elementDrag: useDrag,
    }
  },
  
  mounted() {
    this.thisComponent = (this.$attrs.props as unknown as PropsDefinition).thisComponent;
  },
  
  computed: {

    isActive() {
      return this.editorSettings.getActiveElement()?.ref === this.thisComponent.ref;
    },
  },

  methods: {

    resizeStarted(event: MouseEvent ) {
      this.mouse.updatePositionEvent(event);
      this.isSizing = true;
    },
      
    onResize(aDimension: ClientCoordinates) {
      if (!this.isSizing) { return };
      Resize(this.thisComponent as PageElement, this.mouse as useMouse).onResize(aDimension);
    },

    onImageClick() {
      this.isSizing = false;
      this.$emit('onClick', this.thisComponent);
    },

    onDragStart(event: MouseEvent) {
      if (this.isSizing){ return };
      this.elementDrag(this.thisComponent as PageElement, this.mouse as useMouse).onDragStart(event)
    },
    
    onDrag(event: MouseEvent) {
      this.elementDrag(this.thisComponent as PageElement, this.mouse as useMouse).onDrag(event);
    },

    onDragEnd() {
      this.elementDrag(this.thisComponent as PageElement, this.mouse as useMouse).onDragEnd();
    },

    getDimensions(): string {
      let dimension = '' 
      if(this.thisComponent.dimension) {
        dimension = dimensionToStyle(this.thisComponent.dimension);
      }
      return dimension;
    },

    getImage(): string {
      const DEFAULT_IMAGE = 'imageplaceholder-100x83.png';
      if((this.thisComponent as ImageElement).content === DEFAULT_IMAGE) {
        return getImageUrl((this.thisComponent as ImageElement).content);
      }
      return (this.thisComponent as ImageElement).content;
    },

    getId() {
      return this.thisComponent.ref;
    },

    getClasses(): string {
      return this.thisComponent.classDefinition;
    },

    getStyles(): string {
      let styles = '';
      styles = stylesToString(this.thisComponent.styles)
      styles += this.getDimensions();
      return styles;
    },
    
    getContainerStyles(): string {
      let styles = '';
      if(this.thisComponent.isAbsolute) {
        styles = locationToStyle(this.thisComponent.location);
      }
      if((this.thisComponent as ImageElement).container) {
        styles += dimensionToStyle((this.thisComponent as ImageElement).container.naturalSize);
      }
      return styles;
    }

  },

})
</script>
