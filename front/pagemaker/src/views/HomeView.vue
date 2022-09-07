

<template>
  <main class="w-full flex flex-col">
    <Navbar :nav-menu-items="menuItems"/>
    <div class="flex flex-row justify-start w-100">
      <div class="w-2/12 h-90 mr-4 ">
        <Toolbar />
      </div>
      <div class="w-10/12  mt-4 bg-white">
        <Canvas />
      </div>

    </div>
  </main>
</template>

<script lang="ts">
import type { NavMenuItem } from '@/components/core/navbar/navbar';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import { defineComponent } from 'vue';
import Navbar from "../components/core/navbar/navbar.vue";
import Canvas from '@/components/canvas/canvas.vue';
import Toolbar from '../components/core/toolbar/toolbar.vue';

  export default defineComponent({
    name: 'main',
    
    components: {
    Navbar,
    Canvas,
    Toolbar
},
    
    data() {
      return {
        store: useNavMenuItemStore(),
        menuItems: [] as NavMenuItem[],

      }
    },

    async mounted() {
      await this.store.fetchMenuItems(true);
      this.menuItems = this.store.getMenuItems;
    },

  })
</script>
