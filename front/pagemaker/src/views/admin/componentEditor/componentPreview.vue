<template>
  <p class="row-span-1 col-span-4 row-start-2 col-start-2 bg-gray-400 mt-2 p-2 text-accent-600 text-center font-bold">
    Component Preview
  </p>
  <div class="relative row-start-3 col-start-2 col-span-4">
    <span class="mt-2" :class="getClassDef" :style="getStyle">
      Component
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import { computed } from 'vue';
import { dimensionToStyle, locationToStyle } from '@/common/stylesToString';

  const props = defineProps<{
    component: ToolbarComponentItem | undefined;
  }>();

  const getClassDef = computed(() => {
    if (props.component) return props.component.classes;
    return '';
  });

  const getStyle = computed(() => {
    if (props.component) {
      console.log('%c⧭', 'color: #e5de73', dimensionToStyle(props.component.dimension))
      return `${locationToStyle(props.component.location)}${dimensionToStyle(props.component.dimension)}`
    }
    return '';
  });
</script>