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
      class="absolute w-100 h-full"
      :src="getImage()"
      :style="getStyles()"
    />
    <Resize :is-active="isActive"
      :this-component="thisComponent"
      @resize-started="resizeStarted()"
      @resize-stopped="isSizing=!isSizing"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { useMouse } from '../classes/mouse/mouse';
import resize from '@/components/base/resize/resize.vue';
import { dimensionToStyle, locationToStyle, stylesToString, addStyle } from '../functions/stylesToString';
import type { ImageElement } from '../model/imageElement/imageElement';
import { getImageUrl } from '@/common/getIcon';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { UseDrag } from '@/composables/drag/drag';
import { Style } from '../model/pageElement/pageElement';

export default  defineComponent({
  name: 'imageComponent',

  emits: ['onClick'],

  components: {
    Resize: resize,
  },

  props: {
    thisComponent: {
      type: Object as PropType<ImageElement>,
        required: true
    }
  },

  data() {
    return {
      mouse: new useMouse(),
      isSizing: false,
      editorSettings: new EditorSettingsService(),
      useDrag: new UseDrag(new useMouse()),
      thisComponent: this.thisComponent
    }
  },
  
  computed: {

    isActive() {
      return this.editorSettings.getActiveElement()?.ref === this.thisComponent.ref;
    },
  },

  methods: {

    resizeStarted() {
      this.isSizing = true;
    },
      
    onImageClick() {
      this.isSizing = false;
      this.$emit('onClick', this.thisComponent);
    },

    onDragStart(event: MouseEvent) {
      if (this.isSizing){ return };
      this.thisComponent.classDefinition = this.useDrag.dragStart(event, this.thisComponent.classDefinition);
      this.thisComponent.container.isAbsolute = true;
    },
    
    onDrag(event: MouseEvent) {
      const location = this.thisComponent.container.location;
      this.thisComponent.container.location = {...this.useDrag.onDrag(event, location)};
    },

    onDragEnd() {
      const positionAbsolute: Style = {
        style: 'position',
        value: { value: 'absolute' }
      };
      const styles = (<ImageElement>this.thisComponent).container.styles;
        (<ImageElement>this.thisComponent).container.styles = addStyle(styles, positionAbsolute);
      this.thisComponent.classDefinition = this.useDrag.onDragEnd(this.thisComponent.classDefinition);
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
      if(this.thisComponent.content === DEFAULT_IMAGE) {
        return getImageUrl(this.thisComponent.content);
      }
      return this.thisComponent.content;
    },

    getId() {
      return this.thisComponent.ref;
    },

    getClasses(): string {
      return this.thisComponent.classDefinition;
    },

    getStyles(): string {
      let styles = '';
      styles = stylesToString(this.thisComponent.image.styles)
      styles += this.getDimensions();
      return styles;
    },
    
    getContainerStyles(): string {
      let styles = '';
      if(this.thisComponent.container.isAbsolute) {
        styles = locationToStyle(this.thisComponent.container.location);
      }
      if(this.thisComponent.container) {
        styles += dimensionToStyle(this.thisComponent.container.naturalSize);
      }
      return styles;
    }

  },

})
</script>
