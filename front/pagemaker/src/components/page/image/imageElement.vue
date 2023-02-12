<template>
  <div
    :track-by="getId()"
    :ref="getId()"
    :id="getId()"
    class="relative select-none overflow-hidden"
    :class="thisComponent.classDefinition"
    @click.stop="onImageClick()"
    :style="getContainerStyles()"
  >
    <img
      ref="image-element"
      class="absolute w-100"
      :src="getImage()"
      :style="getStyles()"
      @dragstart="onDragStart($event)"
      @drag="onDrag($event)"
      @dragend="onDragEnd()"
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
import { stylesToString } from '../functions/stylesToString';
import type { ImageElement } from '../model/imageElement/imageElement';
import { getImageUrl } from '@/common/getIcon';
import { EditorSettingsService } from '@/services/editor.settings.service';
import { dragElement } from '@/common/dragElement/dragElement';

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
      isDragging: false,
      editorSettings: new EditorSettingsService(),
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
      this.isDragging = false;
    },
      
    onResize(aDimension: ClientCoordinates) {
      Resize(this.thisComponent as PageElement, this.mouse as useMouse).onResize(aDimension);
    },

    onImageClick() {
      if(this.isSizing) {
        return;
      }
      this.$emit('onClick', this.thisComponent);
    },

    onDragStart(event: MouseEvent) {
      this.isDragging = true;
      this.mouse.setCurrentPosition({ x: event.pageX, y: event.pageY });
      dragElement(this.thisComponent as PageElement, this.mouse as useMouse).onDragStart();
    },
    
    onDrag(event: MouseEvent) {
      if(!this.isDragging) {
        return
      }
      dragElement(this.thisComponent as PageElement, this.mouse as useMouse).onDrag({x: event.pageX, y: event.pageY});
    },

    onDragEnd() {
      this.isDragging = false;
      this.thisComponent.classDefinition = dragElement(this.thisComponent as PageElement, this.mouse as useMouse).onDragEnd()
    },

    getDimensions(): string {
      let dimension = '' 
      if(this.thisComponent.dimension) {
        dimension = this.thisComponent.dimension.toStyle();
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
        styles = this.thisComponent.location.toStyle();
      }
      if((this.thisComponent as ImageElement).container) {
        styles += (this.thisComponent as ImageElement).container.naturalSize.toStyle();
      }
      return styles;
    }

  },

})
</script>
