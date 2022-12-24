<template>
  <div class="sidebar-button-container relative mx-2" >
    <div class="flex flex-row justify-start w-16 px-2 border border-gray-400" @click="show()">
      <img :src="getIconUrl('alphabet_latin-32.png')"
            class="cursor-pointer hover:bg-gray-600"
      />
      <img :src="getIconUrl('down-24.png')" 
        class="w-4 h-4 cursor-pointer hover:bg-gray-800"
        >
    </div>
    <div
      v-if="toggleSelectOptions"
      class="absolute z-20 left-0 top-auto block mx-2"
      @mouseleave="show()"
      @blur="show()"
    >
      <div class="flex flex-row justify-start">
        <span class="font-filter" @click="filterFonts('display')">d</span>
        <span class="font-filter" @click="filterFonts('handwriting')">h</span>
        <span class="font-filter" @click="filterFonts('monospace')">m</span>
        <span class="font-filter" @click="filterFonts('serif')">s</span>
        <span class="font-filter" @click="filterFonts('sans-serif')">ss</span>
      </div>
      <ul class="dropdown-menu-background flex flex-col items-start w-48 h-64 shadow-lg overflow-y-scroll"
        ref='fontList'
        @wheel="onListScroll($event)"
      > 
        <li v-for="font in getFontList"
          :key="font.fontName" 
          @click="fontClicked(font.fontName)" 
          class="dropdown-menu-item mb-2 relative z-auto text-sm w-full"
          :class="{ 'bg-secondary-100': font.fontName === selectedItem }"
          :style="{ 'font-family': font.fontName }"
        >
          {{ font.fontName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import type { FontItemInterface } from '@/classes/base/fonts/models/models';
import { ScrollInfinite } from '@/classes/scroller/scroller';
import type { Style } from '@/components/page/model/pageElement/pageElement';
import { useFontStore } from '@/stores/font.store';
import { defineComponent } from 'vue';
import { getImageUrl } from '@/common/getIcon';

export default defineComponent ({
  name: 'font-picker',
  
  emits: ['onChange'],

  data() {
    return {
      store: useFontStore(),
      DROP_DOWN_ITEMS: 12,
      toggleSelectOptions: false,
      selectedItem: '',
      fontList: [] as FontItemInterface[],
      ifiniteScroll: new ScrollInfinite<FontItemInterface>(12, []),
    };
  },

  mounted() {
    this.fontList = this.store.fontItemList;
    this.ifiniteScroll = new ScrollInfinite<FontItemInterface>(this.DROP_DOWN_ITEMS, this.fontList);
  },

  computed: {
    getFontList(): FontItemInterface[] {
      return this.ifiniteScroll.items;
    },
  },

  methods: {

    getIconUrl(icon: string): string {
      return getImageUrl(icon);
    },

    show() {
      this.toggleSelectOptions = !this.toggleSelectOptions;
    },
    
    onListScroll(event: WheelEvent) {
      if (event.deltaY > 0) {
        this.ifiniteScroll.scrollForward();
      } else {
        this.ifiniteScroll.scrollBackward();
      }
    },
    
    fontClicked(fontName: string) {
      this.show();
      const style: Style = {
        style: 'font-family',
        value: fontName,
        unit: 'px',
      }
      this.$emit('onChange', style);
    },
    
    filterFonts(filterBy: string) {
      this.fontList = this.store.filterFonts(filterBy);
      this.ifiniteScroll = new ScrollInfinite<FontItemInterface>(this.DROP_DOWN_ITEMS, this.fontList);
    },
    
    // listOfFonts(): FontItemInterface[] {
    //   // return this.ifiniteScroll.items;
    // },
  }
})
</script>

<style lang="postcss">
.font-filter {
  @apply w-2/6;
  @apply h-8;
  @apply bg-gray-700;
  @apply text-gray-300;
  @apply inline-block;
  @apply p-1;
  @apply text-center;
}

.font-filter:hover {
  @apply bg-gray-200 text-gray-800 cursor-pointer;
}
</style>