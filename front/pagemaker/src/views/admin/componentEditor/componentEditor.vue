<template>
  <section class="h-screen overflow-hidden">
    <p class="mt-2">Component Editor</p>
    <div class="grid grid-cols-8">
      <div class="border-r-2 border-gray-500 flex-wrap mt-8 ml-2 col-start-1 col-span-1">
        <BaseButton
          class="w-1/2 ml-auto mr-auto mb-16"
          size="small"
          variant="solid"
          buttonType="primary"
          @onClick="createNew()"
        >
          New
        </BaseButton>
        <ul class="flex flex-row justify-start flex-wrap align-top ml-2">
          <li
            v-for="(element, idx) in getIcons"
            :key="idx"
            class="text-2xl w-4/12 cursor-pointer"
          >
            <IconImage
              :iconImage="element"
              classes="w-12 h-12"
              @icon-click="iconClicked($event)"
            />
          </li>
        </ul>
      </div>
      <div class="ml-5 mt-5 col-start-2 col-span-7 grid grid-cols-6 grid-rows-12">
        <form class="p-5 col-start-2 row-start-1 col-span-4">
          <ComponentEditorField :value="editorComponent?.componentName"
            label="Component Name"
            @on-field-change="setPropValue('componentName', $event)"
          />
          <ComponentEditorField :value="editorComponent?.componentHTMLTag"
            label="Component HTML Tag"
            @on-field-change="editorComponent!.componentHTMLTag = $event"
          />
          <ComponentEditorField :value="editorComponent?.componentRef"
            label="Component Ref"
            @on-field-change="editorComponent!.componentRef = $event"
          />
          <ComponentEditorField :value="editorComponent?.tooltip"
            label="Tooltip"
            @on-field-change="editorComponent!.tooltip = $event"
          />
          <div class="grid grid-cols-10 mb-4">
            <label for="icon" class="col-start-1 col-span-4">Select Icon</label>
            <span class="col-start-5 h-8 w-8 bg-accent1 text-center font-bold border cursor-pointer relative hover:bg-site-secondary-light"
              @click="toggleIconPicker()"
            >
              ...
              <IconPicker
                @iconClick="iconPickerClick($event)"
                id="icon-picker"
                ref="icon-picker"
                :showMe="isShowIconPicker"
                @onCloseClick="isShowIconPicker = false"
              />
            </span>
            <div  v-if="editorComponent?.sidebarIcon !== ''"
              class="col-start-6"
            > 
              <img 
                :src="getImageUrl(iconLocal)"
                class="h-10 w-10"
              />
            </div>
          </div>
          <div class="mb-2 w-8/12 grid grid-cols-10">
            <DropDown label="type"
              class="col-start-1 col-span-8"
              :selected-item="editorComponent?.type"
              :initialValue="editorComponent?.type"
              :itemList="getTypes"
              @onSelectChange="editorComponent!.type = $event"
            />
          </div>
          <ComponentEditorField :value="editorComponent?.classes"
            label="CSS tailwind classes to define the component"
            @on-field-change="updateClasses($event)"
          />
          <ComponentEditorField :value="editorComponent?.tooltip"
            label="Enter a short description to indicate function of button"
            @on-field-change="editorComponent!.tooltip = $event"
          />
          <div class="grid grid-cols-10 mb-2">
            <span class="col-span-2"> Dimensions</span>
            <div class="col-span-4 grid grid-cols-2 col-start-5">
              <TextInput class="col-span-2 col-start-2"
                :value="editorComponent?.dimension.width.value.value"
                label="Width"
                type="number"
                @onFieldChange="editorComponent!.dimension.width.value.value=$event"
              />
              <DropDown
                class="w-32 ml-2"
                :initialValue="editorComponent?.dimension.width.value.unit"
                :selected-item="editorComponent?.dimension.width.value.unit"
                label="Units"
                :item-list="getUnits"
                @onSelectChange="editorComponent!.dimension.width.value.unit=$event"
              />
              <TextInput class="col-span-1"
                :value="editorComponent?.dimension.height.value.value"
                type="number"
                label="height"
                @onFieldChange="editorComponent!.dimension.height.value.value=$event"
              />
              <DropDown
                class="w-32 ml-2"
                :initialValue="editorComponent?.dimension.height.value.unit"
                :selected-item="editorComponent?.dimension.height.value.unit"
                label="Units"
                :item-list="getUnits"
                @onSelectChange="editorComponent!.dimension.height.value.unit=$event"
              />
            </div>
          </div>
            <div class="grid grid-cols-10 mb-2">
              <span class="col-span-2">Position</span>
              <div class="col-span-4 col-start-5 grid grid-cols-2">
                <TextInput class="col-span-1"
                  :value="editorComponent?.location.left.value.value"
                  type="number"
                  label="left"
                  @onFieldChange="editorComponent!.location.left.value.value=$event"
                />
                <DropDown
                  class="w-32 ml-2"
                  :initialValue="editorComponent?.location.left.value.unit"
                  :selected-item="editorComponent?.location.left.value.unit"
                  label="Units"
                  :item-list="getUnits"
                  @onSelectChange="editorComponent!.location.left.value.unit = $event"
                />
                <TextInput class="col-span-1"
                  :value="editorComponent?.location.top.value.value"
                  type="number"
                  label="top"
                  @onFieldChange="editorComponent!.location.top.value.value=$event"
                />
                <DropDown class="w-32 ml-2"
                  :initialValue="editorComponent?.location.top.value.unit"
                  :selected-item="editorComponent?.location.top.value.unit"
                  label="Units"
                  :item-list="getUnits"
                  @onChange="editorComponent!.location.top.value.unit=$event"
                />
              </div>
            </div>
          <div class="grid grid-cols-10 mb-8">
            <label for="isContainer" class="col-span-2 w-full">Can Contain Other Elements:</label>
            <input
              type="checkbox"
              name="isContainer"
              id="active"
              :checked="editorComponent?.isContainer"
              class="col-span-1 col-start-5"
              @click="editorComponent!.isContainer = ($event.target as HTMLInputElement).value as unknown as boolean"
            />
          </div>
          <SubmitCancel @submitClick="saveClick()" class="bg-gray-600 h-12 flex flex-row justify-center items-center p-4"/>
        </form>
        <ComponentPreview
          :component="editorComponent"
        ></ComponentPreview>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>

import { computed, onMounted, ref } from 'vue';
import { toolbarService } from '@/services/toolbar/toolbar.service';
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import type { ValueAndUnit } from '@/classes/units';
import TextInput from '@/components/base/formFields/inputText/inputText.vue';
import IconImage from '@/components/utility/icon/icon.vue';
import type { Icon } from '@/components/utility/icon/model/model';
import { getImageUrl } from '@/common/getIcon';
import IconPicker from '@/components/base/pickers/iocnPicker/iconPicker.vue';
import DropDown from '@/components/base/pickers/dropDown/dropDown.vue';
import ComponentEditorField from './componentEditorField.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import SubmitCancel from '@/components/base/baseButton/submitCancel/submitCancel.vue';
import ComponentPreview from './componentPreview.vue';
import type { Location } from '@/classes/location';
import type { Dimension } from '@/classes/dimension';

  const iconLocal = ref('emoji_waiting-32.png');
  const editorComponent = ref<ToolbarComponentItem>();
  const isShowIconPicker = ref<boolean>(false);
  const units = ['px', '%', 'em'];
  const width = ref<ValueAndUnit>();
  const isNew = ref(false);
  type OldDimension = {
    height: ValueAndUnit,
    width: ValueAndUnit,
  };
  type OldLocation = {
    left: ValueAndUnit,
    top: ValueAndUnit,
  };
  
  onMounted(() => {
    toolbarService().fetchToolBarItems();
    editorComponent.value = constructEditorComponent();
    isNew.value = true;
  }) 

  const toggleIconPicker = (): void => {
    isShowIconPicker.value = !isShowIconPicker.value;
  }

  const iconPickerClick = (icon: string): void => {
    iconLocal.value = icon;
    if (editorComponent.value) {
      editorComponent.value.sidebarIcon = icon;
    }
  }

  const iconClicked = (componentName: string): ToolbarComponentItem => {
    const component: ToolbarComponentItem =
    toolbarService().getToolbarItems().filter(
      (element) => element.componentName === componentName
    )[0];
    editorComponent.value = constructEditorComponent();
    editorComponent.value.componentName = component.componentName;
    editorComponent.value.sidebarIcon = component.sidebarIcon;
    editorComponent.value.classes = component.classes;
    editorComponent.value.componentHTMLTag = component.componentHTMLTag;
    editorComponent.value.componentRef = component.componentRef;
    editorComponent.value.componentHTMLTag = component.componentHTMLTag;
    editorComponent.value.tooltip = component.tooltip;
    if (isLocation(component.location)) {
      editorComponent.value.location = component.location;
    } else {
      editorComponent.value.location.left.value = (component.location as OldLocation).left; 
      editorComponent.value.location.top.value = (component.location as OldLocation).top; 
    }
    console.log('%c⧭', 'color: #514080', isDimension(component.dimension))
    if (isDimension(component.dimension)) {
      editorComponent.value.dimension = component.dimension;
    } else {
      editorComponent.value.dimension.height.value = (component.dimension as OldDimension).height;
      editorComponent.value.dimension.width.value = (component.dimension as OldDimension).width;
    }
    editorComponent.value.isContainer = component.isContainer;
    iconLocal.value = component.sidebarIcon;
    width.value = component.dimension.width.value;
    isNew.value = false
    return component;
  }

  const createNew = (): void => {
    editorComponent.value = constructEditorComponent();  
    isNew.value = true;
  };

  const constructEditorComponent = (): ToolbarComponentItem => {
      return {
        classes: '',
        componentName: '',
        componentRef: '',
        componentHTMLTag: 'span',
        dimension: { 
          width: { style: 'width', value: { value: '32', unit: 'px'} },
          height: { style: 'height', value: { value: '32', unit: 'px'} },
      },
      isContainer: false,
      location: { 
        top: { style: 'top', value: { value: '0', unit: 'px'} },
        left: { style: 'left', value: { value: '0', unit: 'px'} },
      },
      sidebarIcon: 'emoji_waiting-32.png',
      tooltip: '',
      type: 'buttonElement',
    };
  }

  const saveClick = async () => {
    if (!editorComponent.value) {
      return;
    }
    if (isNew.value) {
      await toolbarService().postToolbarItem(editorComponent.value);
    } else {
      await toolbarService().patchToolbarItem(editorComponent.value);
    }
    isNew.value = false;
  }

  const getIcons = computed((): Icon[] => {
    const icons = toolbarService().getToolbarItems();
    return icons.map(icon => {
      return {
        icon: icon.sidebarIcon,
        classDef: icon.classes,
        id: icon.componentName,
        tooltip: icon.tooltip,
      }
    })
  });

  const updateClasses = (classes: string) => {
    console.log('%c⧭', 'color: #eeff00', classes)
    if (editorComponent.value) {
      editorComponent.value.classes = classes;
    }
  };

  const setPropValue = (prop: string, value: string) => {
    if (editorComponent.value) {
      editorComponent.value.classes = value
    }
  }

  const isLocation = (location: Location | OldLocation): location is Location => {
    return (<Location>location).left.style !== undefined;
  };

  const isDimension = (dimension:Dimension | OldDimension): dimension is Dimension => {
    return (<Dimension>dimension).width.style !== undefined;
  };

  const getUnits = computed(() => units);

  const getTypes = computed(() => {
    return [
    'container',
    'buttonElement',
    'navBar',
    'pageTemplate',
    'textElement',
    'imageElement',
    'rootContainer',
    'page',
    ]
  });

</script>

<style lang="postcss" scoped>
.container-50 {
  @apply w-6/12;
}

.centered {
  @apply mr-auto;
  @apply ml-auto;
  @apply inline-block;
}

.dimensions {
  @apply flex flex-row justify-start flex-nowrap;
}

.dimensions input {
  @apply w-16;
}

.dimensions label {
  @apply w-12 ml-2 inline-block;
}
</style>
