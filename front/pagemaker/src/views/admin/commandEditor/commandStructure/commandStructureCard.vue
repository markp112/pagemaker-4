<template>
  <section class="rounded-xl bg-site-primary-dark text-site-background shadow-lg pl-2 pb-2 h-80">
    <h2 class="bg-site-primary h-12 text-xl p-2 font-semibold rounded-t-xl">{{ label }}</h2>
    <div class="p-2 grid grid-cols-2 gap-1">
      <div class="pl-4 h-64">
        <DragFromGroup
          class="h-56"
          :id="label"
          :is-draggable="isDraggable"
          :list-items="elements"
          @listItemClick="listItemClick($event)"
          @drag-started="emits('dragStarted', $event)"
        />
      </div>
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
import DragFromGroup from './dragFromGroup.vue';

defineProps<{
  elements: string[],
  label: string,
  isDraggable: boolean,
}>();

const emits = defineEmits(['listItemClick', 'dragStarted'])

const listItemClick = (item: string) => {
  emits('listItemClick', item)
}

</script>