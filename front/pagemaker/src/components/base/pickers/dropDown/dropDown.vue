<template>
  <div class="text-site-primary w-full">
    <div class="flex flex-row justify-between text-sm relative">
      <label for="drop-down" v-if="label" class="w-full block mb-1 font-semibold"> {{ label }}</label>
      <input
        v-model="selectedItem"
        id="drop-down"
        name="drop-down"
        class="p-2 relative bg-site-surface text-on-surface h-6 border border-gray-400 "
        @change="onInputChange()"
      />
      <img
        :src="getPath('down-24.png')"
        class="w-6 h-6 cursor-pointer hover:bg-gray-800 absolute right-0 top-0 border border-gray-400"
        @click="show()"
      />
    </div>
    <ul
      class="dropdown-menu-background flex flex-col text-start absolute z-10 w-full shadow-lg h-auto overflow-auto text-sm"
      v-if="toggleSelectOptions"
      @mouseleave="show"
      @blur="show"
    >
      <li
        v-for="item in itemList"
        :key="item.toString()"
        @click="itemClicked(item.toString())"
        class="dropdown-menu-item block w-full mt-2 px-2"
        :class="{ 'dropdown-menu-selected': item === selectedItem }"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { defineComponent, type PropType } from 'vue';
import { getImageUrl } from '@/common/getIcon';

export default defineComponent({
  name: 'drop-down',
  
  props: { 
    itemList: Array as PropType<string[]>,
    label: String,
    selectedItem: String,
  },
  
  emits: ['onSelectChange'],

  data() {
    return {
      toggleSelectOptions: false,
      currentValue: this.selectedItem,
    }
  },

methods: {

  itemClicked(id: string) {
    this.toggleSelectOptions = false;
    this.$emit('onSelectChange', id);
  },
  
  onInputChange() {
    this.$emit('onSelectChange', this.currentValue);
  },
  
  show() {
    this.toggleSelectOptions = !this.toggleSelectOptions;
  },
  
  getPath(image: string): string {
    return getImageUrl(image);
  },
}
})
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
}

.drop-down-li:hover {
  @apply bg-gray-600;
  @apply text-gray-400;
}
</style>
