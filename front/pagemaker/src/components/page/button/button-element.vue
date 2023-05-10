<template>
  <div
    :ref="getId()"
    :style="getStyles()"
    :class="getClasses()"
    :id="getId()"
    class="flex flex-row justify-center items-center relative"
    @click.stop="onButtonClick()"
    @mousedown.stop="onDragStart($event)"
    @mousemove.stop="onDrag($event)"
    @mouseup.stop="onDragEnd()"
    @dragstart="onDragStart($event)"
    @drag="onDrag($event)"
    @dragend="onDragEnd()"
  >
    {{ getData() }}
    <Resize :is-active="isActive" 
      @resize-started="resizeStarted($event)"
      @on-resize="onResize($event)"
      @resize-stopped="isSizing = !isSizing"
      onclick.stop=""
    />
  </div>
</template>

<script lang="ts">
import type { ClientCoordinates } from '@/classes/clientCoordinates/clientCoordinates';
import resize from '@/components/base/resize/resize.vue';
import { Resize } from '../../base/resize/onResize';
import { useDrag } from '@/composables/drag/drag';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { defineComponent } from 'vue';
import { useMouse } from '../classes/mouse/mouse';
import type { PageElement, PropsDefinition } from '../model/pageElement/pageElement';
import { dimensionToStyle, locationToStyle, stylesToString } from '../functions/stylesToString';

export default defineComponent({
  name:'buttonElement',

  emits: ['onClick'],

  components: {
    Resize: resize,
  },

  data() {
    return {
      isSizing: false,
      isDragging: false,
      thisComponent: Object as unknown as PageElement,
      editorSettings: new EditorSettingsService(),
      mouse: new useMouse(),
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

    getId() {
      return this.thisComponent.ref;
    },

    resizeStarted(event: MouseEvent ) {
      this.mouse.updatePositionEvent(event);
      this.isSizing = true;
    },
      
    onResize(aDimension: ClientCoordinates) {
      if (!this.isSizing) { return };
      Resize(this.thisComponent as PageElement, this.mouse as useMouse).onResize(aDimension);
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

  onDragStart(event: MouseEvent) {
    if (this.isSizing) { return }
    this.elementDrag(this.thisComponent as PageElement, this.mouse as useMouse).onDragStart(event);
    this.isDragging = true;
  },
  
  onDrag(event: MouseEvent) {
    if(this.isDragging) {
      this.elementDrag(this.thisComponent as PageElement, this.mouse as useMouse).onDrag(event);
    }
  },

  onDragEnd() {
    this.isDragging = false;
    this.elementDrag(this.thisComponent as PageElement, this.mouse as useMouse).onDragEnd();
  },
}
})
</script>

<style lang="postcss" scoped>
.handle {
  position: relative;
  box-sizing: border-box;
}
</style>
