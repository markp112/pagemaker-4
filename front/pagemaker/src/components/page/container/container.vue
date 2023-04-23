<template>
  <div class="overflow-hidden relative select-none" 
    :id="getId()"
    :ref="getId()"
    :class="getClasses()"
    :style="getStyles()"
    @dragstart.self.stop="onDragStart($event)"
    @mousedown.stop.self="onDragStart($event)"
    @mouseup.stop.self="onDragEnd()"
    @mousemove.stop="onDrag($event)"
    @drag.self.stop="onDrag($event)"
    @dragend.self.stop="onDragEnd"
    @click.stop.self="onClick()"
    @drop.prevent="onDrop($event)"
    @blur="onBlur()"
  >
    <component v-for="(pageElement, index) in getPageElements()"
      :is="pageElement.componentHTMLTag"
      :key="index"
      :index="index"
      v-bind="getProps(pageElement)"
      :thisComponent="pageElement"
      @onClick="containedElementClick($event)"
      @dragover.prevent
      @drop.stop="onDrop"
    />
    <Resize :is-active="isActive" 
      @resize-started="resizeStarted($event)"
      @on-resize="onResize($event)"
      @resize-stopped="isSizing=false"
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
import buttonElement from '../button/button-element.vue';
import textElement from '../textElement/textElement.vue';
import type { PageContainerInterface } from '../model/pageContainer/container';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { useDrag } from '@/composables/drag/drag';

export default defineComponent({
  name: 'component-container',

  components: {
    Resize: resize,
    imageElement: imageElement,
    buttonElement: buttonElement,
    textElement,
  },

  emits:['onClick'],

  data() {
    return {
      thisComponent: {} as PageContainerInterface,
      pageBuilderService: PageBuilderService(),
      mouse: new useMouse(),
      editorSettings: new EditorSettingsService(),
      isDragging: false,
      isSizing: false,
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
      this.isSizing=true;
      this.mouse.updatePositionEvent(event)
    },
      
    onResize(aDimension: ClientCoordinates) {
      if (this.isSizing) {
        Resize(this.thisComponent as PageContainerInterface, this.mouse as useMouse).onResize(aDimension);
      }
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
