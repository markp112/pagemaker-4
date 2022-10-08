
<template>
  <main class="w-full flex flex-col drop-shadow-lg">
    <Navbar :nav-menu-items="menuItems"
      @nav-menu-clicked="navMenuClicked"
    />
    <div class="w-screen border-box font-body h-screen overflow-hidden">
      <RouterView></RouterView>
    </div>
  </main>

</template>

<script lang="ts">

import { defineComponent } from 'vue';
import {  RouterView } from "vue-router";
import type { NavMenuItem } from './components/core/navbar/navbar';
import Navbar from "@/components/core/navbar/navbar.vue";
import { useNavMenuItemStore } from './stores/navMenuItems.store';
import router from './router';
import { auth } from './services/auth';

export default defineComponent({
  name: 'app',

  components: {
      Navbar,
      RouterView,
    },

  data() {
    return {
      store: useNavMenuItemStore(),
      menuItems: [] as NavMenuItem[],
      toolbarWidth: 'w-2/12',
      toolbarHidden: false,
    }
  },

  async mounted() {
    await this.store.fetchMenuItems(true);
    this.menuItems = this.store.getMenuItems;
    const user = auth().getCachedUser();
    // if (user) {
    //   auth().cacheUser(user);
    //   this.$router.push('/');
    // }
    // else {
      router.push('/login');
    // } 
  },

  methods: {
    navMenuClicked(route: string) {
      this.$router.push(route);
    }
  },

})

</script>

