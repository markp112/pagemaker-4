<template>
  <div class="mt-3 bg-white h-full p-2 flex flex-col justify-start">
    <ToolbarContainer v-if="!toolbarHidden"
      :toolbar-items="containerItems"
      title="Containers"
    />
    <ToolbarContainer v-if="!toolbarHidden"
      :toolbar-items="elementItems"
      title="Elements"
    />
    <span class="absolute -right-10 w-10 p-1 bottom-40 border border-gray-400 rounded-r-full z-10 bg-white">
      <Icon-Image :icon-image="activeIcon" 
        @icon-click="toggleToolbar($event as string)" 
      />
    </span>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
  const TOOLBAR_ICON_HIDE = LEFT_ARROW;
  const TOOLBAR_ICON_UNHIDE = RIGHT_ARROW;

import iconVue from '@/components/utility/icon/icon.vue';
import { toolbarService } from '@/services/toolbar/toolbar.service';
import { useToolbarStore } from '@/stores/toolbars.store';
import { defineComponent } from 'vue';
import ToolbarItem from './toolbarItem.vue';
import ToolbarContainer from './toolbarContainer.vue';
import type { Toolbar } from './model';
import { LEFT_ARROW, RIGHT_ARROW } from '../common/models/showHideIcons';

export default defineComponent({
  name: 'toolbarPanel', 

  emits: ['toggle-clicked'],
  
  props: {
    toolbarHidden: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      activeIcon: TOOLBAR_ICON_HIDE,
      showToolbar: true,
      store: useToolbarStore(),
    }
  },

  async mounted() {
    await toolbarService().getToolBarItems();
  },

  components: {
    "Icon-Image": iconVue,
    ToolbarItem,
    ToolbarContainer
  },

  computed: {
    containerItems(): Toolbar[] {
      return this.containerElements(true);
    },

    elementItems(): Toolbar[] {
      return this.containerElements(false);
    },
    
  },

  methods: {
    toggleToolbar(event: string): void {
      this.activeIcon = event === 'hideToolbar' ? TOOLBAR_ICON_UNHIDE : TOOLBAR_ICON_HIDE;
      this.$emit('toggle-clicked')
    },

    containerElements(isContainer: boolean): Toolbar[] {
      return this.store.toolbarItems.filter(toolbarItem => toolbarItem.isContainer === isContainer);
    }

  },
})
</script>