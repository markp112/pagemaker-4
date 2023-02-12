<template>
  <div class="overflow-hidden relative select-none" 
    :id="getId()"
    :ref="getId()"
    :class="getClasses()"
    :style="getStyles()"
    @dragstart.self="onDragStart($event)"
    @mousedown="onDragStart($event)"
    @mouseup="onDragEnd()"
    @mousemove="onDrag($event)"
    @drag.self="onDrag($event)"
    @dragend="onDragEnd"
    @click.stop="onClick()"
    @drop.prevent="onDrop($event)"
  >
  <component
      v-for="(pageElement, index) in getPageElements()"
      :is="pageElement.componentHTMLTag"
      :key="index"
      :index="index"
      v-bind="getProps(pageElement)"
      @onClick="containedElementClick($event)"
      @dragover.prevent
      @drop.stop="onDrop"
    />
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
import { useMouse } from '../classes/mouse/mouse';
import type { ClientCoordinates } from '@/classes/clientCoordinates/clientCoordinates';
import { Resize } from '../../base/resize/onResize';
import { PageBuilderService } from '@/services/pageBuilder/pageBuilder.service';
import imageElement from '../image/imageElement.vue';
import type { PageContainerInterface } from '../model/pageContainer/container';
import { EditorSettingsService } from '@/services/editor.settings.service';
import { useDrag } from '@/composables/drag/drag';
import { containerButtons } from '@/components/base/editorButtons/model/borderButtonData';

export default defineComponent({
  name: 'component-container',

  components: {
    Resize: resize,
    imageElement: imageElement,
    container: containerButtons,
  },

  emits:['onClick'],

  data() {
    return {
      thisComponent: {} as PageContainerInterface,
      pageBuilderService: PageBuilderService(),
      mouse: new useMouse(),
      editorSettings: new EditorSettingsService(),
      isDragging: false,
      elementDrag: useDrag,
    }
  },

  mounted() {
    this.thisComponent = ((this.$attrs.props as unknown as PropsDefinition).thisComponent) as PageContainerInterface;
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
        styles = this.thisComponent.location.toStyle();
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
        dimension = this.thisComponent.dimension.toStyle();
      }
      return dimension;
    },

    getPageElements(): PageElement[] {
      return (this.thisComponent as PageContainerInterface).elements;
    },

    getProps(component: PageElement) {
      return {props: {thisComponent: component}};
    },

    resizeStarted(event: MouseEvent ) {
      this.mouse.updatePositionEvent(event)
    },
      
    onResize(aDimension: ClientCoordinates) {
      Resize(this.thisComponent as PageContainerInterface, this.mouse as useMouse).onResize(aDimension);
    },

    onClick() {
      this.$emit('onClick', this.thisComponent);
    },

    containedElementClick(pageElement: PageElement): void {
      this.$emit('onClick', pageElement);
    },

    onDrop(event: DragEvent): void {
      event.stopImmediatePropagation();
      const componentName = this.getComponentName(event);
      this.pageBuilderService.createNewComponent(componentName, this.thisComponent.ref);
    },

    onDragStart(event: MouseEvent) {
      this.isDragging = true;
      this.elementDrag(this.thisComponent as PageContainerInterface, this.mouse as useMouse).onDragStart(event)
    },
      
    onDrag(event: MouseEvent) {
      if(this.isDragging) {
        this.elementDrag(this.thisComponent as PageContainerInterface as PageElement, this.mouse as useMouse).onDrag(event);
      }
    },

    onDragEnd() {
      this.isDragging = false;
      this.elementDrag(this.thisComponent as PageContainerInterface as PageElement, this.mouse as useMouse).onDragEnd();
    },
      
    getComponentName(event: DragEvent): string {
      const dataTransfer = event.dataTransfer;
      return dataTransfer ? dataTransfer.getData('text') : '';
    }
  }

})
</script>
