<template>
  <div class="py-2 bg-site-primary shadow-lg h-16 z-20 w-full pr-5">
    <nav class="text-on-primary flex items-center justify-between">
      <div class="pr-10">
        <img
          src="@/assets/icons/layout-48.png"
          class="ml-2 text-primary-200 cursor-pointer hover:text-primary-100 self-start"
        />
      </div>
      <div class="mr-2 flex justify-between relative">
        <img
          src="@/assets/icons/menu-48.png"
          class="ml-2 text-primary-200 cursor-pointer hover:bg-site-secondary self-start"
          @click="toggleMenu=!toggleMenu"
        />

        <div id="menu"
          class="flex justify-end toggleable z-30 absolute top-12 right2 bg-white border-gray-100 border-2"
          v-if="toggleMenu"
        >
          <ul
            class="w-20 mr-1 dropdown-menu-background z-10 rounded-lg shadow-lg text-sm h-auto"
            @mouseleave="toggleMenu = !toggleMenu"
          >
            <li
              v-for="(menuItem, idx) in navMenuItems"
              :key="idx"
              @click="menuItemClick(idx)"
              v-show="menuItem.isVisible"
              class="block p-1 text-left dropdown-menu-item"
            >
              {{ menuItem.navText }}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import type { PropType } from 'vue';
import { defineComponent, } from 'vue';
import type { NavMenuItem } from './navbar';

export default defineComponent({
  name: 'navbar',

  props: {
    navMenuItems: {
      type: Object as PropType<NavMenuItem[]>,
      required: true,
    }
  },
  
  emits: ['navMenuClicked',],
  
  data() {
    return {
      toggleMenu: false,
      store: useNavMenuItemStore(),
    }
  },

  methods: {
    menuItemClick(id: number) {
      if (this.navMenuItems) {
        this.$emit('navMenuClicked', this.navMenuItems[id].navLink);
        this.toggleMenu = !this.toggleMenu;
      }
    }
  }

});

</script>
