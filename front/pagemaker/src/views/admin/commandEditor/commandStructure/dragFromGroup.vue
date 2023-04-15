<template>
  <div>
    <h2 class="font-semibold">{{ label }}</h2>
    <ul class="list-container">
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
  </div>
</template>

<script lang="ts" setup>import { ref } from '@vue/reactivity';

const props = defineProps<{
  label: string,
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
  @apply border p-2 h-auto w-48 mt-2
}

.selected {
  @apply bg-zinc-600;
  @apply text-white;
  @apply p-2;
}
</style>