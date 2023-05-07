<template>
  <div class="font-semibold h-56 bg-site-primary-dark text-site-background rounded-xl shadow-xl pl-2 pr-2 pb-2 w-80">
      <h3 class="bg-site-primary h-12 text-xl p-2 font-semibold rounded-t-xl mb-1">{{ label }}</h3>
      <ul class="list-container h-40 overflow-y-auto scrollbar"
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
    </div>
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
  @apply hover:bg-zinc-400 hover:text-on-primary p-2 cursor-pointer;
}

.list-container {
  @apply  p-2 w-full;
}

.selected {
  @apply bg-zinc-600;
  @apply text-white;
  @apply p-2;
}

.delete-symbol {
  @apply bg-red-700; 
  @apply w-6;
  @apply h-6;
  @apply text-center;
  @apply text-white;
  @apply font-semibold;
  @apply text-lg;
  @apply text-center;
  @apply hover:cursor-crosshair;
  @apply cursor-pointer;
}

.scrollbar::-webkit-scrollbar {
    width: 20px;
    height: 20px;
  }

  .scrollbar::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: #f7f4ed;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background: #e0cbcb;
    border-radius: 100vh;
    border: 3px solid #f6f7ed;
  }

  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: #c0a0b9;
  }
</style>