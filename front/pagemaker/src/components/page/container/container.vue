<template>
  <div class="overflow-hidden relative select-none" 
    :id="getId()"
    :ref="getId()"
    :class="getClasses()"
    :style="getStyles()"
    @mousedown.stop.self="onDragStart($event)"
    @mouseup.stop.self="onDragEnd()"
    @mousemove="onDrag($event)"
    @dragstart.self.stop="onDragStart($event)"
    @drag.self.stop="onDrag($event)"
    @dragend.self.stop="onDragEnd"
    @click.stop.self="onClick()"
    @drop.prevent="onDrop($event)"
    @blur="onBlur()"
  >
    <component v-for="(pageElement, index) in getPageElements()"
      :is="pageElement.type"
      :key="index"
      :index="index"
      :thisComponent="pageElement"
      @onClick="containedElementClick($event)"
      @dragover.prevent
      @drop.stop="onDrop"
    />
    <Resize :is-active="isActive"
    :this-component="thisComponent" 
      @resize-started="resizeStarted($event)"
      @resize-stopped="isSizing = false"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { dimensionToStyle, locationToStyle, stylesToString } from '@/common/stylesToString';
import resize from '@/components/base/resize/resize.vue';
import { useMouse } from '../classes/mouse/mouse';
import { Resize } from '../../base/resize/onResize';
import { PageBuilderService } from '@/services/pageBuilder/pageBuilder.service';
import imageElement from '../image/imageElement.vue';
import buttonElement from '../button/button-element.vue';
import textElement from '../textElement/textElement.vue';
import type { PageContainerInterface } from '../model/pageContainer/container';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { UseDrag } from '@/composables/drag/drag';
import type { ActiveElements } from '../model/imageElement/imageElement';

export default defineComponent({
  name: 'component-container',

  components: {
    Resize: resize,
    imageElement: imageElement,
    buttonElement: buttonElement,
    textElement,
  },

  props: {
    thisComponent: {
      type: Object as PropType<PageContainerInterface>,
        required: true
    }
  },

  emits:['onClick'],

  data() {
    return {
      thisComponent: this.$props.thisComponent,
      pageBuilderService: PageBuilderService(),
      mouse: new useMouse(),
      editorSettings: new EditorSettingsService(),
      isDragging: false,
      isSizing: false,
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

    getPageElements(): ActiveElements[] {
      return (this.thisComponent as PageContainerInterface).elements;
    },

    resizeStarted(event: MouseEvent ) {
      this.isSizing = true;
    },
      
    onClick() {
      this.isSizing = false;
      this.$emit('onClick', this.thisComponent);
    },

    onBlur() {
      this.isActive = false;
      this.isDragging = false;
      this.isSizing = false;
    },

    containedElementClick(pageElement: ActiveElements): void {
      this.$emit('onClick', pageElement);
    },

    onDrop(event: DragEvent): void {
      event.stopImmediatePropagation();
      const componentName = this.getComponentName(event);
      this.pageBuilderService.createNewComponent(componentName, this.thisComponent.ref);
    },

    onDragStart(event: MouseEvent) {
      this.isDragging = true;
      this.thisComponent.classDefinition = this.elementDrag.dragStart(event, this.thisComponent.classDefinition);
      this.thisComponent.isAbsolute = true;
    },
      
    onDrag(event: MouseEvent) {
      if(this.isDragging) {
        const location = this.thisComponent.location;
        this.thisComponent.location = {...this.elementDrag.onDrag(event, location)};
      }
    },

    onDragEnd() {
      this.isDragging = false;
      this.thisComponent.classDefinition = this.elementDrag.onDragEnd(this.thisComponent.classDefinition);
    },
      
    getComponentName(event: DragEvent): string {
      const dataTransfer = event.dataTransfer;
      return dataTransfer ? dataTransfer.getData('text') : '';
    }
  }

})
</script>
