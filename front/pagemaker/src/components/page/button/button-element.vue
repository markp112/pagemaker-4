<template>
  <div
    :ref="getId()"
    :style="getStyles()"
    :class="getClasses()"
    :id="getId()"
    class="flex flex-row justify-center items-center relative"
    @click.stop="onButtonClick()"
    @mousedown.stop="onDragStart($event)"
    @mousemove="handleMouseMove($event)"
    @mouseup.stop="onDragEnd()"
    @dragstart="onDragStart($event)"
    @drag="onDrag($event)"
    @dragend="onDragEnd()"
  >
    {{ getData() }}
    <Resize 
      :is-active="isActive" 
      :this-component="thisComponent"
      @resize-stopped="isSizing = false"
      @resize-started="resizeStarted()"
    />
  </div>
</template>

<script lang="ts">
import resize from '@/components/base/resize/resize.vue';
import { Resize } from '../../base/resize/onResize';
import { UseDrag } from '@/composables/drag/drag';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { defineComponent, type PropType } from 'vue';
import { useMouse } from '../classes/mouse/mouse';
import type { ButtonElement } from '../model/imageElement/imageElement';
import { stylesToString, locationToStyle, dimensionToStyle } from '@/common/stylesToString';

export default defineComponent({
  name:'buttonElement',

  emits: ['onClick'],

  components: {
    Resize: resize,
  },

  props: {
    thisComponent: {
      type: Object as PropType<ButtonElement>,
        required: true
    }
  },

  data() {
    return {
      isSizing: false,
      isDragging: false,
      thisComponent: this.$props.thisComponent,
      editorSettings: new EditorSettingsService(),
      elementDrag: new UseDrag(new useMouse()),
    }
  },
  
  computed: {

    isActive() {
      return this.editorSettings.getActiveElement()?.ref === this.thisComponent.ref;
    },
  },

  methods: {

    getId() {
      return this.thisComponent.ref;
    },

    resizeStarted() {
      this.isSizing = true;
      this.isDragging = false;
    },
      
    getClasses(): string {
      return this.thisComponent.classDefinition;
    },

    getStyles(): string {
      let styles = '';
      if(this.thisComponent.isAbsolute) {
        styles = locationToStyle(this.thisComponent.location);
      }
      if(this.thisComponent.styles) {
        styles += stylesToString(this.thisComponent.styles)
      } 
      styles += this.getDimensions();
      return styles;
    },

    getDimensions(): string {
      let dimension = '' 
      if(this.thisComponent.dimension) {
        dimension = dimensionToStyle(this.thisComponent.dimension);
      }
      return dimension;
    },

    getData(): string {
      return this.thisComponent.content;
    },

    getClass(): string {
      return this.thisComponent.classDefinition;
    },

    onButtonClick() {
      if(this.isSizing) {
        return;
      }
      this.$emit('onClick', this.thisComponent);
    },

    handleMouseMove(event: MouseEvent) {
      if (this.isDragging) {
        this.onDrag(event);
      }
    },

    onDragStart(event: MouseEvent) {
      if (this.isSizing) { return }
      this.thisComponent.classDefinition = this.elementDrag.dragStart(event, this.thisComponent.classDefinition);
      this.thisComponent.isAbsolute = true;
      this.isDragging = true;
    },
    
    onDrag(event: MouseEvent) {
      if(this.isDragging) {
        this.thisComponent.location = this.elementDrag.onDrag(event, this.thisComponent.location);
      }
    },

    onDragEnd() {
      this.isDragging = false;
      this.thisComponent.classDefinition = this.elementDrag.onDragEnd(this.thisComponent.classDefinition);
    },
}
})
</script>

<style lang="css" scoped>
.handle {
  position: relative;
  box-sizing: border-box;
}
</style>
