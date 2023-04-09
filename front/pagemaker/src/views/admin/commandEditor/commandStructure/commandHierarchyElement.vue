<template>
  <p class="ml-4 font-semibold h-48"
    >
      <h3 class="font-semibold">{{ label }}</h3>
      <ul class="border p-2 w-48 h-44 border-gray-500 overflow-y-auto"
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
          :class="{'selected': listItem === activeItem,  }"
          @click="listItemClicked(listItem)"
        >{{ listItem }}</li>
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

const emits = defineEmits(['onDragDrop', 'listItemClicked']);
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
  @apply border p-2 h-auto w-44 mt-2
}

.selected {
  @apply bg-zinc-600;
  @apply text-white;
  @apply p-2;
}

</style>