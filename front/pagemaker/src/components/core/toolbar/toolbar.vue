<template>
  <div class="border border-r-1 border-gray-400 h-full relative">
    toolbar
    <span class="absolute -right-10 w-10 p-1 bottom-40 border border-gray-400 rounded-r-full z-10">
      <Icon-Image :icon-image="activeIcon" @icon-click="toggleToolbar($event as string)"></Icon-Image>
    </span>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
  const TOOLBAR_ICON_HIDE: Icon = {
    classDef: '',
    icon: 'left-grey-24.png',
    id: 'hideToolbar',
    tooltip: 'Hide toolbar'
  };
  const TOOLBAR_ICON_UNHIDE: Icon = {
    classDef: '',
    icon: 'right-grey-24.png',
    id: 'showToolbar',
    tooltip: 'Show toolbar'
  };

import iconVue from '@/components/utility/icon/icon.vue';
import type { Icon } from '@/components/utility/icon/model/model';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'toolbar', 

  emits: ['toggle-clicked'],

  data() {
    return {
      activeIcon: TOOLBAR_ICON_HIDE,
      showToolbar: true,
    }
  },

  components: {
    'Icon-Image': iconVue,
  },

  methods: {
    toggleToolbar(event: string): void {
      console.log('%c⧭', 'color: #917399', this.activeIcon )
      this.activeIcon = event === 'hideToolbar' ? TOOLBAR_ICON_UNHIDE : TOOLBAR_ICON_HIDE;
      console.log('%c⧭', 'color: #917399', this.activeIcon )
      this.$emit('toggle-clicked')
    }

  },
})
</script>