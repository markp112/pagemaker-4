
<template>
  <main class="w-full flex flex-col drop-shadow-lg bg-site-background text-site-primary-dark">
    <Navbar :nav-menu-items="getMenuItems"
      @nav-menu-clicked="navMenuClicked"
    />
    <div class="w-screen border-box font-body h-screen overflow-hidden">
      <RouterView></RouterView>
    </div>
    <Snackbar/>
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
import { useAuthStore } from './stores/auth.store';
import SnackbarVue from '@/components/base/notifications/snackbar/snackbar.vue';

export default defineComponent({
  name: 'app',

  components: {
      Navbar,
      RouterView,
      Snackbar: SnackbarVue,
    },

  data() {
    return {
      store: useNavMenuItemStore(),
      authStore: useAuthStore(),
      authService: auth(),
      toolbarWidth: 'w-2/12',
      toolbarHidden: false,
    }
  },

  async mounted() {
    router.push('/login');
    // if (this.authStore.user.tokenId === undefined) {
    //   const user = auth().getCachedUser();
    //   console.log('%c⧭', 'color: #733d00', user)
    //   if (user === null) {
    //     router.push('/login');
    //   } else {
    //     if (user.tokenId !== null) {
    //       if (this.authService.isTokenExpired(user.expiry)) {
    //         router.push('login');
    //       } else {
    //         auth().cacheUser(user);
    //         this.$router.push('/sites');
    //       }
    //     }
    //   }
    // }
    await this.store.fetchMenuItems(true);
  },

  computed: {
    getMenuItems(): NavMenuItem[] {
      return this.store.getMenuItems;
    }
  },

  methods: {
    navMenuClicked(route: string) {
      this.$router.push(route);
    }
  },

})

</script>

