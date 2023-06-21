<template>
  <div class="w-full p-2">
    <div class="flex flex-row justify-between text-sm relative">
      <label for="drop-down" v-if="label" class="w-full block mb-1 font-semibold"> {{ label }}</label>
    <div class="relative">
      <input
        v-model="selectedItem"
        id="drop-down"
        name="drop-down"
        class="p-2 relative bg-site-surface text-on-surface h-6 border border-gray-400 "
        @change="onInputChange($event)"
      />
      <img
        :src="getPath('down-24.png')"
        class="w-6 h-6 cursor-pointer bg-site-primary-light hover:bg-gray-800 absolute right-0 top-0 border border-gray-400 "
        @click="show()"
      />
    
    <ul
      class="dropdown-menu-background flex flex-col text-start absolute z-10 shadow-lg overflow-auto text-sm p-2 left-0"
      v-if="toggleSelectOptions"
      @mouseleave="show"
      @blur="show"
    >
      <li
        v-for="item in itemList"
        :key="item.toString()"
        @click="itemClicked(item.toString())"
        class="dropdown-menu-item block w-auto mt-2 px-2"
        :class="{ 'dropdown-menu-selected': item === selectedItem }"
      >
        {{ item }}
      </li>
    </ul>
  </div>
  </div>
</div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { getImageUrl } from '@/common/getIcon';

  defineProps<{ 
    itemList:string[],
    label: string,
    selectedItem: string | undefined,
  }>();
  
  const emits = defineEmits(['onSelectChange']);

  const toggleSelectOptions = ref(false);

  const itemClicked = (id: string) => {
    toggleSelectOptions.value = false;
    emits('onSelectChange', id);
  };
  
  const onInputChange = (event: Event) => {
    const value = (event.currentTarget as HTMLInputElement).value;
    console.log('%c⧭', 'color: #7f2200', value)
    emits('onSelectChange', value);
  };
  
  const show = () => {
    toggleSelectOptions.value = !toggleSelectOptions.value;
  };
  
  const getPath = (image: string): string => {
    return getImageUrl(image);
  };
</script>

<style lang="css">
.drop-down-li {
  @apply cursor-pointer;
  @apply mb-2;
  @apply relative;
  @apply z-auto;
  @apply text-sm;
  @apply w-full;
  @apply text-center;
  @apply p-2;
}

.drop-down-li:hover {
  @apply bg-gray-600;
  @apply rounded-lg;
  @apply rounded;
  @apply text-gray-400;
  @apply w-9/12;
}
</style>
