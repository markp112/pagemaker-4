<template>
  <div class="absolute left-0 top-12 border border-gray-400 rounded-r-md mr-2 z-50 
    shadow-lg  transition-all ease-out-in duration-1000 transform translate-x-0" :class="getToolbarClasses" >
    <div class="bg-white h-full p-2 flex flex-col justify-start rounded-md nav-content">
      <ToolbarContainer v-if="!isHidden"
      :toolbar-items="containerItems"
      title="Containers"
      />
      <ToolbarContainer v-if="!isHidden"
      :toolbar-items="elementItems"
      title="Elements"
      />
      <span class="absolute -right-10 w-10 p-1 border border-gray-400 rounded-r-full z-10 bg-white">
        <Icon-Image :icon-image="activeIcon" 
        @icon-click="toggleToolbar()" 
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import iconVue from '@/components/utility/icon/icon.vue';
import { toolbarService } from '@/services/toolbar/toolbar.service';
import { useToolbarStore } from '@/stores/toolbars.store';
import { defineComponent } from 'vue';
import ToolbarItem from './toolbarItem.vue';
import ToolbarContainer from './toolbarContainer.vue';
import type { ToolbarComponentItem } from './model';
import { LEFT_ARROW, RIGHT_ARROW } from '../common/models/showHideIcons';

const TOOLBAR_ICON_HIDE = LEFT_ARROW;
const TOOLBAR_ICON_UNHIDE = RIGHT_ARROW;

export default defineComponent({
  name: 'toolbarPanel', 

  data() {
    return {
      activeIcon: TOOLBAR_ICON_HIDE,
      showToolbar: true,
      store: useToolbarStore(),
      width: 'w-64',
      isHidden: false,
    }
  },

  async mounted() {
    await toolbarService().fetchToolBarItems();
  },

  components: {
    'Icon-Image': iconVue,
    ToolbarItem,
    ToolbarContainer
  },

  computed: {
    containerItems(): ToolbarComponentItem[] {
      return this.containerElements(true);
    },

    elementItems(): ToolbarComponentItem[] {
      return this.containerElements(false);
    },
    getToolbarClasses(): string {
      return this.width;
      },
  },

  methods: {
    toggleToolbar(): void {
      this.width = this.width === 'w-64' ? 'w-1' : 'w-64';
      this.isHidden = !this.isHidden;
      this.activeIcon = this.isHidden ? TOOLBAR_ICON_UNHIDE : TOOLBAR_ICON_HIDE;
    },

    containerElements(isContainer: boolean): ToolbarComponentItem[] {
      return this.store.toolbarItems.filter(toolbarItem => toolbarItem.isContainer === isContainer);
    }

  },
})
</script>

<style lang="css" scoped>

</style>