<template>
  <span class="mx-2 border rounded-lg 
    bg-site-primary-dark
    grid 
    grid-flow-row
    grid-rows-2
    gap-2
    w-48
    p-1 text-site-surface h-12"
    :class="getClass"
    @drag="onDrag(index)"
    @dragstart="onDragStart(index)"
    @drop="onDrop(index)"
  >
    <span class="text-sm overflow-hidden"> {{ item.classToApply }} </span>
    <span class="flex flex-row justify-between">
      <img :src="getImageUrl('pencil-32.png')"
      alt="edit item"
      @click="emit('onEditClick', item)">
      <img :src="getImageUrl('minus_red-32.png')" alt="delete item" 
      @click="emit('onDeleteClick', item)">
    </span>
  </span>
</template>

<script lang="ts" setup>
import type { SelectListIcon } from '@/components/base/editorButtons/model';
import { getImageUrl } from '@/common/getIcon';
import { ref } from 'vue';
  
  defineProps<{
    item: SelectListIcon,
    index: number,
  }>();

  const emit = defineEmits(['onEditClick', 'onDeleteClick', 'onDragStart', 'onDrag', 'onDrop']);

  const isDragging = ref(false);

  const onDrag = (index: number) => {
    emit('onDrag', index)
  };

  const onDragStart =(index: number) => {
    isDragging.value = true;
    emit('onDragStart', index);
  };

  const getClass = () => isDragging.value ? 'cursor-move' : '';

  const onDrop = (index: number) => {
    emit('onDrop', index);
  };

</script>

<style scoped lang="css">
  img {
    @apply cursor-pointer;
    @apply h-4 w-4;
  
  }
</style>