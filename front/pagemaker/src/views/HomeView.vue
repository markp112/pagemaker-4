

<template>
  <main class="w-full">
    <Navbar :nav-menu-items="menuItems"/>
  </main>
</template>

<script lang="ts">
import type { NavMenuItem } from '@/components/core/navbar/navbar';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import { defineComponent } from 'vue';
import Navbar from "../components/core/navbar/navbar.vue";

  export default defineComponent({
    name: 'main',
    
    components: {
      Navbar
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
