<template>
  <p class="ml-4 font-semibold h-48">
      <h3 class="font-semibold">{{ label }}</h3>
      <ul class="border p-2 w-64 container h-44 border-gray-500 overflow-y-auto"
        dropzone="true"
        @drop="onItemDrop($event)"
        @dragover.prevent="onDragEnter($event)"
        @dragenter.prevent
        @dragend="isDropable = false"
        @dragleave="isDropable = false"
        draggable="true"
        :id="id"
        :class="{'border-gray-500 border-4 border-dashed': isDropable}"
      >
        <li v-for="listItem in listItems" 
          class="list-item"
          :key="listItem"
          :class="{'selected': listItem === activeItem,  }"
          @click="listItemClicked(listItem)"
        >
          <span class="flex flex-row justify-between">
            {{ listItem }}
            <span class="delete-symbol"
              @click="emits('deleteClicked', listItem)"
            >-</span>
          </span>  
        </li>
      </ul>
    </p>
</template>

<script lang="ts" setup>

import { ref } from '@vue/reactivity';

const props = defineProps<{
  listItems: string[],
  id: string,
  label: string,
  draggedItem: string,
}>();

const emits = defineEmits(['onDragDrop', 'listItemClicked', 'deleteClicked']);
const activeItem = ref();
const isDropable = ref(false);

const onItemDrop = (dropEvent: DragEvent) => {
  const droppedItem = getDroppedItemData(dropEvent);
  if (droppedItem.permittedTarget === (dropEvent.target as HTMLElement).id) {
    emits('onDragDrop', droppedItem.item);
  }
  isDropable.value = false;
};

const getDroppedItemData = (dropEvent: DragEvent) => {
  const dataTransfer = dropEvent.dataTransfer;
  if (dataTransfer) {
    return JSON.parse(dataTransfer.getData('item'));
  }
  return { item: '', permittedTarget: '' }; 
}

const listItemClicked = (item: string) => {
  activeItem.value = item;
  emits('listItemClicked', item);
};

const onDragEnter = (dragEnter: DragEvent) => {
  const targetElement = dragEnter.target as HTMLElement;
  isDropable.value = targetElement.id === props.draggedItem;
};


</script>

<style lang="css" scoped>
.list-item {
  @apply hover:bg-site-primary-dark hover:text-on-primary p-2 cursor-pointer;
}

.list-container {
  @apply border p-2 h-auto w-56 mt-2;
}

.selected {
  @apply bg-zinc-600;
  @apply text-white;
  @apply p-2;
}

.delete-symbol {
  @apply bg-red-700; 
  @apply w-4;
  @apply h-6;
  @apply text-center;
  @apply text-white;
  @apply font-semibold;
  @apply hover:cursor-crosshair;
}

</style>