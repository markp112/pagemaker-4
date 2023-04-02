<template>
  <div class="mt-8 mb-2 flex flex-row relative"
    @dragover.prevent
  >
    <p class="h-12 mr-6">Select list items:</p>
      <BaseButton button-type="primary" @on-click="showEditorForm()">Add</BaseButton>
      <SelectListItem :index="index"
        :item="item"
        v-for="(item, index) in getItems"
        @on-drag-start="currentlyDraggedItem = $event"
        @on-drop="onDrop($event)"
        @on-delete-click="deleteItem($event)"
        @on-edit-click="editItem($event)"
      />
    <SelectListItemForm class="absolute left-0 top-12"
      v-if="showListItemForm"
      @on-save="addItem($event)"
      @on-close="showListItemForm=false"
      :edited-item="editedItem"
    />

  </div>
</template>

<script lang="ts" setup>

import type { SelectListIcon } from '@/components/base/editorButtons/model';
import { ref, computed } from 'vue';
import SelectListItem from './selectListItem.vue';
import BaseButton from '@/components/base/baseButton/baseButton.vue';
import SelectListItemForm from './selectListItemForm.vue';

const props = defineProps<{
  selectListItems: SelectListIcon[],
}>();

const emits = defineEmits(['onDrop', 'listUpdated']);
const showListItemForm = ref(false);
const editedItem = ref<SelectListIcon>(
  {
    classToApply: '',
    icon: '',
    tooltip: '',
  }
)
const currentlyDraggedItem = ref()
const itemsList = ref<SelectListIcon[]>(props.selectListItems);

const getItems = computed(() =>{
  return itemsList.value ? itemsList.value : [];
});

const onDrop = (itemReplacing: number) => {
  if(currentlyDraggedItem.value && itemsList.value) {
    reSortSelectListItems(itemReplacing)
    emits('onDrop', itemsList);
  }
};

const reSortSelectListItems = (itemReplacing: number) => {
  const item = itemsList.value.splice(currentlyDraggedItem.value, 1)[0];
  itemsList.value.splice(itemReplacing, 0, item);
  emits('listUpdated', itemsList.value);
};

const showEditorForm = () => {
  editedItem.value = {...{
    classToApply: '',
    icon: '',
    tooltip: '',
  }};
  showListItemForm.value = true;
}

const addItem = (item: SelectListIcon) => {
  if(!itemsList.value) {
    itemsList.value = [];
  }
  itemsList.value.filter(i => i.classToApply !== item.classToApply);
  itemsList.value.push(item);
  emits('listUpdated', itemsList.value);
};

const deleteItem = (item: SelectListIcon) => {
  itemsList.value = itemsList.value.filter(i => i !== item);
  emits('listUpdated', itemsList.value);
};

const editItem = (item: SelectListIcon) => {
  editedItem.value = item;
  showListItemForm.value = true;
}

</script>