<template>
    <ul class="list-container bg-blend-darken bg-gradient-to-t bg-site-primary overflow-y-auto scrollbar">
      <li v-for="item in listItems"
        class="list-item"
        :class="{'selected': item === activeElement}"
        :key="item"
        @click="listItemClick(item)"
        :draggable="isDraggable"
        @dragstart="startDrag($event, item)"
      >
        {{ item }}
      </li>
    </ul>
</template>

<script lang="ts" setup>import { ref } from '@vue/reactivity';

const props = defineProps<{
  listItems: string[];
  id: string;
  isDraggable: boolean;
}>();

const emits = defineEmits(['dragStarted', 'listItemClick'])

const activeElement = ref();

const listItemClick = (item: string) => { 
  activeElement.value = item;
  emits('listItemClick', item);
};

const startDrag = (evt: DragEvent, item: string) => {
  if(props.isDraggable) {
    evt.dataTransfer!.dropEffect = 'move';
    evt.dataTransfer!.effectAllowed = 'move';
    const dragData = { permittedTarget: props.id, item: item };
    evt.dataTransfer!.setData('item', JSON.stringify(dragData));
    emits('dragStarted', props.id)
  }
};

</script>

<style lang="css" scoped>
.list-item {
  @apply hover:bg-site-primary-dark hover:text-on-primary p-2 cursor-pointer;
}

.list-container {
  @apply p-2 w-10/12;
}

.selected {
  @apply bg-zinc-600;
  @apply text-white;
  @apply p-2;
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